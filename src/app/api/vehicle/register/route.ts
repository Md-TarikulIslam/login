import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import VehicleSales from '@/models/vehicleSalesModel';
import { sendEmail } from "@/helpers/mailer"
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { vehicle_name, vehicle_model, date_of_purchase, price, docs_correct, vehicle_type, seller_type, website_url, photo, email, phone, street, city, state, postal_code, country, message } = reqBody;
console.log(vehicle_name, vehicle_model, date_of_purchase, price, docs_correct, vehicle_type, seller_type, website_url, photo, email, phone, street, city, state, postal_code, country, message)

        if (!vehicle_name || !vehicle_model || !date_of_purchase || !price || !docs_correct || !vehicle_type || !seller_type || !photo || !email || !phone || !street || !city || !state || !postal_code || !country || !message) {

            console.log("HI", reqBody)
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 })

        };
        console.log("HIvgh")
        const newVehicle = new VehicleSales({  vehicle_name, vehicle_model, date_of_purchase, price, docs_correct, vehicle_type, seller_type, website_url, photo, email, phone, street, city, state, postal_code, country, message  });
        console.log(newVehicle)
            const savedVehicle = await newVehicle.save();

        console.log("dlkfjsdklfhsdkjflksadjf", savedVehicle);

        //send email
        await sendEmail({
            email,
            emailType: "",
            id: savedVehicle._id,
            subject: "Vehicle Sales data registered!",
            html: `<p>By using this email (${email}) a vehicle sale info has been registered successfully in ${process.env.DOMAIN}</p>`
        })

        return NextResponse.json({
            message: "Vehicle Sales created successfully",
            success: true,
            savedRent: savedVehicle
        })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}