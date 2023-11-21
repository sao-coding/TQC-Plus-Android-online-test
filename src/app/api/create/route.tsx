import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import getData from "@/utils/getData"
import { Exam } from "@/types/exam"

export const GET = async (req: NextRequest) => {
    // 數量
    const total = req.nextUrl.searchParams.get("total") ?? 30
    const data = await getData()
    // 隨機取 30 題 去掉 answer
    const random = data
        .sort(() => Math.random() - 0.5)
        .slice(0, Number(total))
        .map((item: Exam) => {
            return {
                ...item,
                answer: undefined,
            }
        })
    return NextResponse.json(random)
}
