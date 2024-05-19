import { Products } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
    const { id } = params;

    try {
        connectToDb();
        const product = await Products.findById(id);
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);
    }
};

export const PUT = async (request: any, { params }: any) => {
    const { id } = params;
    const { name, price, salePrice, ingredient, imgs, inStock } =
        await request.json();
    console.log("Imgs >>>" + JSON.stringify(imgs));

    try {
        await connectToDb();
        await Products.findByIdAndUpdate(id, {
            name: name,
            price: price,
            salePrice: salePrice,
            ingredient: ingredient,
            imgs: imgs,
            inStock: inStock,
        });
        return NextResponse.json(
            { message: "Product updated" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
    }
};
