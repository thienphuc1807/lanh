import { Products } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
    const { id } = params;

    try {
        await connectToDb();
        const product = await Products.findById(id);
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);
    }
};
