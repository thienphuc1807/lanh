"use server";

import { signIn, signOut } from "./auth";
import { User } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcryptjs"

export const handleGithubLogin = async () => {
    await signIn("github");
};

export const handleGithubLogout = async () => {
    await signOut();
}

export const handleRegister = async (fromData: any) => {
    const { username, email, password, confirmPassword } = Object.fromEntries(fromData)

    if (password !== confirmPassword) {
        return "Password do not match"
    }

    try {
        connectToDb()
        const user = await User.findOne({ username })
        if (user) {
            return "Username already exists"
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()
        console.log("save to DB");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" }
    }
}

export const handleLogin = async (formData: any) => {
    const { username, password } = Object.fromEntries(formData)

    try {
        await signIn("credentials", { username, password })
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" }
    }
}

