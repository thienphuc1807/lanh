import { connectToDb } from "./utils";
import { Products, User } from "./models";

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

export const getProduct = async (id: string) => {
    try {
        connectToDb();
        const product = await Products.findById({ id });
        return product;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get product by ID");
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
