"use server";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { Products, User } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";

export const handleGithubLogin = async () => {
    await signIn("github");
};

export const handleGithubLogout = async () => {
    await signOut();
};

export const handleRegister = async (previousState: any, fromData: any) => {
    const { username, email, img, password, confirmPassword } =
        Object.fromEntries(fromData);

    if (password !== confirmPassword) {
        return { error: "Password do not match" };
    }

    try {
        connectToDb();
        const user = await User.findOne({ username });
        if (user) {
            return { error: "Username already exists!" };
        }

        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return { error: "Email already exists!" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        console.log("save to DB");
        return { success: true };
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" };
    }
};

export const handleLogin = async (previousState: any, formData: any) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { username, password });
    } catch (error: any) {
        console.log(error);
        if (error.type?.includes("CredentialsSignin")) {
            return { error: "Invalid username or password" };
        }
        throw error;
    }
};

export const handleRemoveProduct = async (id: string) => {
    try {
        connectToDb();
        await Products.deleteOne({ _id: id });
        console.log("deleted from db");
        revalidatePath("/dashboard/products");
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
        revalidatePath("/dashboard/users");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" };
    }
};

const saveImageToLocal = async (formData: FormData) => {
    const files: File[] = formData.getAll("files") as File[];

    const multipleBuffersPromise = files.map((file) =>
        file.arrayBuffer().then((data) => {
            const buffer = Buffer.from(data);
            const name = uuidv4();
            const ext = file.type.split("/")[1];

            // Not working in vercel
            // const uploadDir = path.join(
            //     process.cwd(),
            //     "public/upload",
            //     `/${name}.${ext}`
            // );

            const tmpDir = os.tmpdir();
            console.log(tmpDir);

            const uploadDir = path.join(tmpDir, `/${name}.${ext}`);

            fs.writeFile(uploadDir, buffer);
            return { filepath: uploadDir, filename: file.name };
        })
    );

    return await Promise.all(multipleBuffersPromise);
};

export const uploadPhoto = async (formData: FormData) => {
    try {
        const newFiles = await saveImageToLocal(formData);
        console.log(newFiles);
        // connectToDb();
        // const newProduct = new Products({
        //     name,
        //     price,
        //     salePrice,
        //     ingredient,
        //     image,
        //     slug,
        // });
        // await newProduct.save();
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
};
