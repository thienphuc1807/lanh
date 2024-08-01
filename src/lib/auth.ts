import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectToDb } from "./utils";
import { User } from "./models";
import { authConfig } from "./auth.config";

const login: any = async (credentials: any) => {
    try {
        await connectToDb(); // Ensure the DB connection is awaited
        const user = await User.findOne({ username: credentials.username });

        if (!user) {
            throw new Error("Invalid username");
        }

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
        );

        if (!isPasswordCorrect) {
            throw new Error("Invalid password");
        }

        return user;
    } catch (error: any) {
        console.error(error.message);
        throw new Error("Failed to login");
    }
};

const createUserProfile = async (profile: any) => {
    const newUser = new User({
        username: profile.email
            ? profile.email.replace("@gmail.com", "")
            : "testuser",
        email: profile.email,
        fullName: profile.name,
        isAdmin: false,
        phoneNumber: "",
        city: "",
        ward: "",
        district: "",
        address: "",
    });
    await newUser.save();
    return {
        _id: newUser?._id,
        fullName: newUser?.fullName,
        email: newUser?.email,
        isAdmin: newUser?.isAdmin || false,
        phoneNumber: newUser?.phoneNumber,
        city: newUser?.city,
        ward: newUser?.ward,
        district: newUser?.district,
        address: newUser?.address,
    };
};

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            async profile(profile) {
                await connectToDb();
                const user = await User.findOne({ email: profile.email });
                if (!user) {
                    return await createUserProfile(profile);
                }
                return {
                    _id: user?._id,
                    fullName: user?.fullName,
                    email: user?.email,
                    isAdmin: user?.isAdmin || false,
                    phoneNumber: user?.phoneNumber,
                    city: user?.city,
                    ward: user?.ward,
                    district: user?.district,
                    address: user?.address,
                };
            },
        }),
        Credentials({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,
    },
});
