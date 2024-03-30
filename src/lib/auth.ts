import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDb } from "./utils";
import { User } from "./models";
import { authConfig } from "./auth.config";

const login = async (credentials: any) => {
    try {
        connectToDb();
        const user = await User.findOne({ username: credentials.username });

        if (!user) {
            throw new Error("Wrong Username")
        }
        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
        );

        if (!isPasswordCorrect) {
            throw new Error("Wrong Password")
        }
        return user;
    } catch (error) {
        throw new Error("Fail to Login!")
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
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            async profile(profile) {
                const user = await User.findOne({ email: profile?.email });
                return {
                    id: profile.id.toString(),
                    username: profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    isAdmin: user?.isAdmin ? user.isAdmin : false
                }
            }
        }),
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials)
                    return user
                } catch (error) {
                    console.log(error);
                    return null
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "github") {
                connectToDb();
                try {
                    const user = await User.findOne({ email: profile?.email });
                    if (!user) {
                        const newUser = new User({
                            username: profile?.login,
                            email: profile?.email,
                            img: profile?.avatar_url,
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
        ...authConfig.callbacks
    },
});
