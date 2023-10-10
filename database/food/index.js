import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isVeg: { type: Boolean, required: true },
    isContainsEgg: { type: Boolean, required: true },
    categories: [{ type: String, required: true }],
    photos: [{
        type: mongoose.Types.ObjectId,
        ref: "Images"
    }],
    price: {
        type: Number,
        default: 50,
        required: true
    },
    addOns: [{
        type: mongoose.Types.ObjectId,
        ref: "Foods",
        required: true
    }],
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: "Restaurants",
        required: true
    }

},{
    timestamps: true
});

export const FoodModel = mongoose.model("Foods", FoodSchema);