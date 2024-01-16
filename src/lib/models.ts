import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    salePrice: {
        type: String,
    },
    price: {
        type: String,
    },
    img: {
        type: String,
    },
    ingredient: {
        type: String,
    }

})

export const Products = mongoose.models.Products || mongoose.model('Products', productSchema);