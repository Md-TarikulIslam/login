import mongoose from "mongoose";

const vehicleSalesSchema = new mongoose.Schema({
  vehicle_name: {
    type: String,
    required: [true, "Please provide vehicle name"],
  },
  vehicle_model: {
    type: Number,
    required: [true, "Please provide vehicle model"],
  },
  date_of_purchase: {
    type: String,
    required: [true, "Please provide the date"],
  },
  price: {
    type: String,
    required: [true, "Please provide the price"],
  },
  docs_correct: {
    type: Number,
    required: [true, "Please provide docs correct"],
  },
  vehicle_type: {
    type: String,
    required: [true, "Please provide vehicle type"],
  },
  seller_type: {
    type: String,
    required: [true, "Please provide seller type"],
  },
  website_url: {
    type: String,
    required: [true, "Please provide the website url"],
  },

  photo: {
    type: String,
    required: [true, "Please upload a photo"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    required: [true, "Please provide phone number"],
  },
  street: {
    type: String,
    required: [true, "Please provide street"],
  },
  city: {
    type: String,
    required: [true, "Please provide city"],
  },
  state: {
    type: String,
    required: [true, "Please provide state"],
  },
  postal_code: {
    type: String,
    required: [true, "Please provide postal code"],
  },
  country: {
    type: String,
    required: [true, "Please provide country"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
  },
});

const VehicleSales = mongoose.models.vehiclesales || mongoose.model("vehiclesales", vehicleSalesSchema);

export default VehicleSales;
