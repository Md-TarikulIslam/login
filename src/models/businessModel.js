import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: [true, "Please provide a photo"],
  },
  products_quantity: {
    type: Number,
    required: [true, "Please provide the quantity"],
  },
  products_price: {
    type: Number,
    required: [true, "Please provide the price"],
  },
  social_media: {
    type: String,
  },
  company_name: {
    type: String,
  },
  company_registered_address: {
    type: String,
  },
  company_website_url: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, ""],
  },
  phone: {
    type: String,
    required: [true, "Please provide phone number"],
  },
  street: {
    type: String,
    required: [true, "Please provide the street"],
  },
  city: {
    type: String,
    required: [true, "Please provide the city"],
  },
  state: {
    type: String,
    required: [true, "Please provide the state"],
  },
  postal_code: {
    type: String,
    required: [true, "Please provide the postal code"],
  },
  country: {
    type: String,
    required: [true, "Please provide the country"],
  },
  message: {
    type: String,
    required: [true, "Please provide the message"],
  },
});

const Business =
  mongoose.models.business || mongoose.model("business", businessSchema);
export default Business;
