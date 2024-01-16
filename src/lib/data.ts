import { connectToDb } from "./utils";
import { Products } from "./models";

// interface product {
//     id: number
//     name: string
//     sale_price: number
//     price: number
//     ingredient: string
//     image: string
// }

export const getProducts = async () => {
    try {
        connectToDb()
        const products = await Products.find()
        return products
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get products")
    }
}

export const getProduct = async (id: number) => {
    try {
        connectToDb()
        const product = await Products.findById(id)
        return product
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get product by ID")
    }
}




