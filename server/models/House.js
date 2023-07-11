import { Schema } from "mongoose";



export const HouseSchema = new Schema({
    style: { type: String, required: true, enum: ['Condo', 'Single Family', 'Multi-Family', 'Lot/Land', 'commercial', 'Townhome', 'Apartment'], default: 'Single Family' },
    built: { type: Number, max: 2025, min: 1900 },
    price: { type: Number, required: true, max: 2000000 },
    bedrooms: { type: Number, required: true, max: 20, min: 1 },
    bathrooms: { type: Number, required: true, max: 10, min: 1 },
    acres: { type: Number, max: 100, },
    sqft: { type: Number, required: true, max: 10000 },
    hasyard: { type: Boolean, default: true },
    imgUrl: { type: String, required: true, default: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
    creatorId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })