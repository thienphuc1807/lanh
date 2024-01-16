// "use server";
// import { revalidatePath } from "next/cache"
// import { Products } from "./models"
// import { connectToDb } from "./utils"

// interface FormData {
//     name?: string | "";
//     price?: string | "";
//     salePrice?: string | "";
//     ingredient?: string | "";
// }


// export const addProduct = async (formData: FormData) => {
//     console.log(formData);

//     // Destructuring
//     const { name, price, salePrice, ingredient } = Object.fromEntries(formData);
//     try {

//         // Connect to the database
//         await connectToDb();

//         // Create a new product
//         const newProduct = new Products({ name, price, ingredient, salePrice });

//         // Save the new product
//         await newProduct.save();

//         // Revalidate the "/products" path
//         revalidatePath("/products");
//     } catch (error) {
//         console.error("Something went wrong:", error);
//     }
// };
