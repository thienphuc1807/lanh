"use server";
import { signIn, signOut } from "./auth";
import { File, Orders, Products, User } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import os from "os";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const handleGithubLogin = async () => {
    await signIn("github");
};

export const handleGithubLogout = async () => {
    await signOut();
};

export const handleRegister = async (previousState: any, fromData: any) => {
    const { username, email, password } = Object.fromEntries(fromData);
    try {
        connectToDb();
        const user = await User.findOne({ username });
        if (user) {
            return { error: "Tên đăng nhập đã tồn tại!" };
        }

        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return { error: "Email đã được đăng ký!" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            userAvatar: "",
            fullName: "",
            phoneNumber: "",
            city: "",
            ward: "",
            district: "",
            address: "",
        });
        await newUser.save();
        console.log("save to DB");
        return { success: true };
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" };
    }
};

export const handleLogin = async (previousState: any, formData: FormData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { username, password });
    } catch (error: any) {
        console.log(error);
        if (error.type?.includes("CredentialsSignin")) {
            return { error: "Sai tên đăng nhập hoặc mật khẩu" };
        }
        throw error;
    }
};

export const handleRemoveProduct = async (id: string | undefined) => {
    try {
        connectToDb();
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
        connectToDb();
        await User.deleteOne({ _id: id });
        console.log("deleted from db");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" };
    }
    revalidatePath("/dashboard/users");
};

const saveImageToLocal = async (formData: FormData) => {
    const files: File[] = formData.getAll("files") as File[];
    const multipleBuffersPromise = files.map((file) =>
        file.arrayBuffer().then((data) => {
            const buffer = Buffer.from(data);
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
    try {
        const newFiles = await saveImageToLocal(formData);
        const files = await uploadImagesToCloudinary(newFiles);
        connectToDb();
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
    try {
        const newFiles = await saveImageToLocal(formData);
        const files = await uploadImagesToCloudinary(newFiles);
        connectToDb();
        const fileDocs = [];
        for (const file of files) {
            const newFile = new File({ url: file.secure_url });
            fileDocs.push(await newFile.save());
        }
        newFiles.map((file) => fs.unlink(file.filepath));
        await Products.findByIdAndUpdate(id, {
            name,
            price,
            salePrice,
            imgs: fileDocs,
            ingredient,
            inStock,
            quantity,
        });
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
        userID,
    } = Object.fromEntries(formData);
    const ordersProduct: string[] = formData.getAll("orders") as string[];
    const orderList = [];
    for (const item of ordersProduct) {
        orderList.push(JSON.parse(item));
    }

    try {
        connectToDb();
        const newOrders = new Orders({
            userID: userID,
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            city: city,
            district: district,
            ward: ward,
            address: address,
            status: "Đã đặt hàng",
            orders: orderList,
        });
        await newOrders.save();
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
};

export const handleEditUser = async (formData: FormData, id: string) => {
    const { fullName, email, phoneNumber, city, district, ward, address } =
        Object.fromEntries(formData);
    try {
        connectToDb();
        await User.findOneAndUpdate(
            { _id: id },
            {
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                city: city,
                district: district,
                ward: ward,
                address: address,
            }
        );
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
};
