import mongoose, { Schema } from "mongoose";

const fileSchema = new mongoose.Schema({
    url: { type: String },
});

const productSchema = new mongoose.Schema(
    {
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
        imgs: [fileSchema],
        ingredient: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        inStock: {
            type: Number,
        },
    },
    { timestamps: true }
);

const orderSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
        },
        email: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        city: {
            type: String,
        },
        district: {
            type: String,
        },
        ward: {
            type: String,
        },
        address: {
            type: String,
        },
        status: {
            type: String,
        },
        orders: [productSchema],
    },
    { timestamps: true }
);

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
        imgs: {
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
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        fullName: {
            type: String,
        },
        userAvatar: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        city: {
            type: String,
        },
        ward: {
            type: String,
        },
        district: {
            type: String,
        },
        address: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Products =
    mongoose.models.Products || mongoose.model("Products", productSchema);
export const File = mongoose.models.File || mongoose.model("File", fileSchema);
export const News = mongoose.models.News || mongoose.model("News", newsSchema);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Orders =
    mongoose.models.Orders || mongoose.model("Orders", orderSchema);
