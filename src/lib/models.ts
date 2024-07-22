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
        category: {
            type: String,
        },
        size: [String],
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
        note: {
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
            unique: true,
        },
        password: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
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

const userFeedBackSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        productId: {
            type: String,
            required: true,
        },
        rating: {
            type: String,
        },
        comment: {
            type: String,
        },
        fullName: {
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

export const UserFeedBack =
    mongoose.models.UserFeedBack ||
    mongoose.model("UserFeedBack", userFeedBackSchema);
