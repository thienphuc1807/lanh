import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
    const { id } = params;

    try {
        connectToDb();
        const user = await User.findById(id);
        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
    }
};
