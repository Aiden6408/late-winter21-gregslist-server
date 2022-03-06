import mongoose from "mongoose";

const Schema = mongoose.Schema

export const HouseSchema = new Schema(
    {
        bedrooms: { type: String, required: true },
        bathrooms: { type: String, required: true },
        levels: { type: Number, required: true },
        imgUrl: { type: String },
        price: { type: Number, required: true },
        description: { type: String }






    }

)