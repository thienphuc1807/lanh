import { News } from "@/lib/models"
import { connectToDb } from "@/lib/utils"
import { NextResponse } from "next/server"

export const GET = async (request: any, { params }: any) => {
    const { slug } = params
    try {
        connectToDb()
        const news = await News.findOne({ slug })
        return NextResponse.json(news)
    } catch (error) {
        console.log(error);
    }
}