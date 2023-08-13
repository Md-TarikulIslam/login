import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import VehicleSales from '@/models/vehicleModel';
import { sendEmail } from "@/helpers/mailer"
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { vehicle_website_url, vehicle_model, date_of_purchase, price, docs_correct, vehicle_type, seller_type, website_url, photo, email, phone, street, city, state, postal_code, country, message } = reqBody;


        if (!vehicle_website_url || !vehicle_model || !date_of_purchase || !price || !docs_correct || !vehicle_type || !seller_type || !photo || !email || !phone || !street || !city || !state || !postal_code || !country || !message) {
            console.log("dlkfjsdklfhsdkjflksadjf");

            return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
        };

        const newVehicleSales = new VehicleSales({ vehicle_website_url, vehicle_model, date_of_purchase, price, docs_correct, vehicle_type, seller_type, website_url, photo, email, phone, street, city, state, postal_code, country, message });

        const savedVehicleSales = await newVehicleSales.save();

        //send email
        await sendEmail({
            email,
            emailType: "",
            id: savedVehicleSales._id,
            subject: "Vehicle Sales data registered!",
            html: `<p>By using this email (${email}) a vehicle sale info has been registered successfully in ${process.env.DOMAIN}</p>`
        })

        return NextResponse.json({
            message: "Vehicle Sales created successfully",
            success: true,
            savedRent: savedVehicleSales
        })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}