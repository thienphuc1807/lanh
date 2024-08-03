"use server";
import { signIn, signOut } from "./auth";
import { File, Orders, Products, User, UserFeedBack } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import os from "os";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const handleEmailLogin = async () => {
    await signIn("google");
};

export const handleLogout = async () => {
    await signOut();
};

export const handleRegister = async (fromData: FormData) => {
    const {
        username,
        fullName,
        email,
        isAdmin,
        password,
        phoneNumber,
        city,
        district,
        address,
        ward,
    } = Object.fromEntries(fromData);
    try {
        await connectToDb();
        const user = await User.findOne({ username });
        if (user) {
            return { error: "Tên đăng nhập đã tồn tại!" };
        }

        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return { error: "Email đã được đăng ký!" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.toString(), salt);
        const newUser = new User({
            username: username || "",
            email: email || "",
            password: hashedPassword || "",
            fullName: fullName || "",
            phoneNumber: phoneNumber || "",
            city: city || "",
            ward: ward || "",
            district: district || "",
            address: address || "",
            isAdmin: isAdmin || false,
        });
        await newUser.save();
        console.log("save to DB");
        return { success: true };
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" };
    }
};

export const handleLogin = async (formData: FormData) => {
    const { username, password } = Object.fromEntries(formData);
    try {
        await signIn("credentials", { username, password });
        redirect("/");
    } catch (error: any) {
        if (error.type?.includes("CredentialsSignin")) {
            return { error: "Sai tên đăng nhập hoặc mật khẩu" };
        }
        throw error;
    }
};

export const handleRemoveProduct = async (id: string | undefined) => {
    try {
        await connectToDb();
        await Products.deleteOne({ _id: id });
        console.log("deleted from db");
        revalidatePath("/(admin)/dashboard/products");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" };
    }
};

export const handleRemoveUser = async (id: string) => {
    try {
        await connectToDb();
        await User.deleteOne({ _id: id });
        console.log("deleted from db");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" };
    }
    revalidatePath("/dashboard/users");
};

const saveImageToLocal = async (formData: FormData | File) => {
    let files;
    if (formData instanceof FormData) {
        files = formData.getAll("files") as File[];
    } else {
        files = [formData];
    }
    const multipleBuffersPromise = files.map((file) =>
        file.arrayBuffer().then((data) => {
            const buffer: any = Buffer.from(data);
            const name = uuidv4();
            const ext = file.type.split("/")[1];
            const tmpDir = os.tmpdir();
            const uploadDir = path.join(tmpDir, `/${name}.${ext}`);
            fs.writeFile(uploadDir, buffer);
            return { filepath: uploadDir, filename: file.name };
        })
    );

    return await Promise.all(multipleBuffersPromise);
};

export const uploadImagesToCloudinary = async (
    newFiles: { filepath: string; filename: string }[]
) => {
    const multipleImagesPromise = newFiles.map((file) =>
        cloudinary.uploader.upload(file.filepath, { folder: "lanh_images" })
    );
    return await Promise.all(multipleImagesPromise);
};

export const uploadProduct = async (formData: FormData) => {
    const { name, price, salePrice, ingredient, inStock, quantity } =
        Object.fromEntries(formData);
    const sizes = formData.getAll("size");
    try {
        const newFiles = await saveImageToLocal(formData);
        const files = await uploadImagesToCloudinary(newFiles);
        await connectToDb();
        const fileDocs = [];
        for (const file of files) {
            const newFile = new File({ url: file.secure_url });
            fileDocs.push(await newFile.save());
        }
        newFiles.map((file) => fs.unlink(file.filepath));
        const newProduct = new Products({
            name,
            price,
            salePrice,
            imgs: fileDocs,
            ingredient,
            inStock,
            quantity,
            size: sizes,
        });
        await newProduct.save();
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
};

export const updateProduct = async (formData: FormData, id: string) => {
    const { name, price, salePrice, ingredient, inStock, quantity } =
        Object.fromEntries(formData);
    const sizes = formData.getAll("size");
    const images = formData.getAll("files");

    try {
        await connectToDb();
        let fileDocs = [];
        for (const item of images) {
            if (typeof item === "object") {
                const newFiles = await saveImageToLocal(item);
                const files = await uploadImagesToCloudinary(newFiles);
                for (const file of files) {
                    const newFile = new File({ url: file.secure_url });
                    fileDocs.push(await newFile.save());
                }
                newFiles.map((file) => fs.unlink(file.filepath));
            }
        }
        if (fileDocs.length > 0) {
            await Products.findByIdAndUpdate(id, {
                name,
                price,
                salePrice,
                imgs: fileDocs,
                ingredient,
                inStock,
                quantity,
                size: sizes,
            });
        } else {
            await Products.findByIdAndUpdate(id, {
                name,
                price,
                salePrice,
                ingredient,
                inStock,
                quantity,
                size: sizes,
            });
        }
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
};

export const handleUploadOrders = async (formData: FormData) => {
    const {
        fullName,
        email,
        phoneNumber,
        city,
        district,
        ward,
        address,
        note,
        userID,
    } = Object.fromEntries(formData);
    const ordersProduct: string[] = formData.getAll("orders") as string[];
    const orderList = [];
    for (const item of ordersProduct) {
        const product: Products = JSON.parse(item);
        const productOrders: Products = {
            _id: product._id,
            name: product.name,
            salePrice: product.salePrice,
            imgs: product.imgs,
            price: product.price,
            quantity: product.quantity,
            ingredient: product.ingredient,
            category: product.category,
            size: product.size,
        };
        await Products.findByIdAndUpdate(productOrders._id, {
            $inc: { inStock: -productOrders.quantity },
        });
        orderList.push(productOrders);
    }
    try {
        await connectToDb();
        const newOrders = new Orders({
            userID: userID,
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            city: city,
            district: district,
            ward: ward,
            address: address,
            note: note,
            status: "pending",
            orders: orderList,
        });
        await newOrders.save();
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
};

export const handleEditUser = async (formData: FormData, id: string) => {
    const {
        username,
        fullName,
        email,
        phoneNumber,
        city,
        district,
        ward,
        address,
        isAdmin,
    } = Object.fromEntries(formData);

    try {
        await connectToDb();

        const user = await User.findOne({ username });
        if (user && user._id.toString() !== id) {
            return { error: "Tên đăng nhập đã tồn tại!" };
        }

        const userEmail = await User.findOne({ email });
        if (userEmail && userEmail._id.toString() !== id) {
            return { error: "Email đã được đăng ký!" };
        }

        await User.findByIdAndUpdate(id, {
            username,
            fullName,
            email,
            phoneNumber,
            city,
            district,
            ward,
            address,
            isAdmin,
        });
        return { success: true };
    } catch (err) {
        console.log(err);
        return { error: "An error occurred while updating the user." };
    }
};

export const handleUserFeedback = async (
    formData: FormData,
    userId: string,
    productId: string,
    fullName: string
) => {
    const { rating, comment } = Object.fromEntries(formData);
    try {
        await connectToDb();
        const newFeedback = new UserFeedBack({
            userId,
            productId,
            rating,
            comment,
            fullName,
        });
        await newFeedback.save();
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
};

export const updateStatus = async (id: string, status: string) => {
    try {
        await connectToDb();
        await Orders.findByIdAndUpdate(id, {
            status: status,
        });
        revalidatePath("/(admin)/dashboard");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
};
