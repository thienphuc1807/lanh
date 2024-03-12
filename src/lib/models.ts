import mongoose from "mongoose";
import { title } from "process";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
})

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            require: true
        },
        img: {
            type: String
        },
        slug: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
)

export const Products = mongoose.models.Products || mongoose.model('Products', productSchema);
export const News = mongoose.models.News || mongoose.model('News', newsSchema);