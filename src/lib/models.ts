import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
    },
    ingredient: {
        type: String,
    }

})

export const Products = mongoose.models.Products || mongoose.model('Products', productSchema);