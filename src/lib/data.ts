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

export const getUser = async (id: string) => {
    try {
        connectToDb();
        const user = await User.findOne({ _id: id });
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get user by ID");
    }
};

export const getOrdersByUserId = async (userID: string) => {
    try {
        connectToDb();
        const orders = await Orders.find({ userID: userID });
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
