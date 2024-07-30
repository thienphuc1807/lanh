import { connectToDb } from "./utils";
import { Orders, Products, User, UserFeedBack } from "./models";

export const getProducts = async () => {
    try {
        connectToDb();
        const products = await Products.find();
        return products;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get products");
    }
};

export const getUsers = async () => {
    try {
        connectToDb();
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get users");
    }
};

export const getUser = async (email: string) => {
    try {
        connectToDb();
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get user by Email");
    }
};

export const getOrders = async () => {
    try {
        connectToDb();
        const orders = await Orders.find();
        return orders;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get all orders");
    }
};

export const getOrdersByUserEmail = async (email: string) => {
    try {
        connectToDb();
        const orders = await Orders.find({ email: email });
        return orders;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get orders");
    }
};

export const getOrderById = async (orderID: string) => {
    try {
        connectToDb();
        const order = await Orders.find({ _id: orderID });
        return order;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get orders");
    }
};

export const getFeedbacks = async () => {
    try {
        connectToDb();
        const feedbacks = await UserFeedBack.find();
        return feedbacks;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get feedbacks");
    }
};
