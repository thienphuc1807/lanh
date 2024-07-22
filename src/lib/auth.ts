import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectToDb } from "./utils";
import { User } from "./models";
import { authConfig } from "./auth.config";

const login = async (credentials: any) => {
    try {
        connectToDb();
        const user = await User.findOne({ username: credentials.username });

        if (!user) {
            throw "Wrong Username";
        }
        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
        );

        if (!isPasswordCorrect) {
            throw "Wrong Password";
        }
        return user;
    } catch (err) {
        console.log("Login err >>>", err);
        throw err;
    }
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
                const user = await User.findOne({ email: profile?.email });
                return {
                    fullName: profile.name,
                    email: profile.email,
                    isAdmin: user?.isAdmin ? user.isAdmin : false,
                    phoneNumber: user?.phoneNumber,
                    city: user?.city,
                    ward: user?.ward,
                    district: user?.district,
                    address: user?.address,
                };
            },
        }),
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    console.log("authorize error >>>", err);
                    throw err;
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                try {
                    const user = await User.findOne({ email: profile?.email });
                    if (!user) {
                        const newUser = new User({
                            email: profile?.email,
                            fullName: profile?.name,
                            phoneNumber: "",
                            city: "",
                            ward: "",
                            district: "",
                            address: "",
                        });
                        await newUser.save();
                    }
                } catch (error) {
                    console.log(error);
                    return false;
                }
            }
            return true;
        },
        ...authConfig.callbacks,
    },
});
