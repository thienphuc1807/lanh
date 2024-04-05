import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    salePrice: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
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
        required: true,
    },
});

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            require: true,
        },
        img: {
            type: String,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        img: {
            type: String,
        },
        password: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Products =
    mongoose.models.Products || mongoose.model("Products", productSchema);
export const News = mongoose.models.News || mongoose.model("News", newsSchema);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
