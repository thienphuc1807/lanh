import { Products } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDb();
        const products = await Products.find();
        return NextResponse.json(products);
    } catch (error) {
        console.log(error);
    }
};
