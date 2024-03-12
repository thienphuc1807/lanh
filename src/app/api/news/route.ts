import { News } from "@/lib/models"
import { connectToDb } from "@/lib/utils"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        connectToDb()
        const news = await News.find()
        return NextResponse.json(news)
    } catch (error) {
        console.log(error);

    }
}