import { connectToDb } from "./utils";
import { Products } from "./models";

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
