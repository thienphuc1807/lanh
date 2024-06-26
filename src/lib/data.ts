import { connectToDb } from "./utils";
import { Orders, Products, User } from "./models";

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
