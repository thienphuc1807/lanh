import { connectToDb } from "./utils";
import { Orders, Products, User, UserFeedBack } from "./models";

export const getProducts = async () => {
    try {
        await connectToDb();
        const products = await Products.find();
        return products;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get products");
    }
};

export const getUsers = async () => {
    try {
        await connectToDb();
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get users");
    }
};

export const getUser = async (id: string) => {
    try {
        await connectToDb();
        const user = await User.findOne({ _id: id });
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get user by Email");
    }
};

export const getOrders = async () => {
    try {
        await connectToDb();
        const orders = await Orders.find();
        return orders;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get all orders");
    }
};

export const getOrdersByUserID = async (id: string) => {
    try {
        await connectToDb();
        const orders = await Orders.find({ userID: id });
        return orders;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get orders");
    }
};

export const getOrderById = async (orderID: string) => {
    try {
        await connectToDb();
        const order = await Orders.find({ _id: orderID });
        return order;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get orders");
    }
};

export const getFeedbacks = async () => {
    try {
        await connectToDb();
        const feedbacks = await UserFeedBack.find();
        return feedbacks;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get feedbacks");
    }
};
