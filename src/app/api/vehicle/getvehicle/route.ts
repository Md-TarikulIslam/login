import { NextRequest, NextResponse } from "next/server";
import VehicleSales from "@/models/vehicleModel"
import { connect } from "@/dbConfig/dbConfig"
connect()

export async function GET(request: NextRequest) {
    try {
        const vehiclesalesdata = await VehicleSales.find();

        return NextResponse.json({
            message: "all vehicle sales data",
            data: vehiclesalesdata
        })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}