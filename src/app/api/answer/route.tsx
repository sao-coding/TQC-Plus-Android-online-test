import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import getData from "@/utils/getData"
import { Exam } from "@/types/exam"
import { it } from "node:test"

export const GET = async (req: NextRequest) => {
    // req.nextUrl.searchParams
    const id = req.nextUrl.searchParams.get("id")
    const data = await getData()
    // 搜尋 此 id 的題目 回傳 id 跟 answer
    const question = data.filter((item: Exam) => item.id === id) as Exam[]
    const { answer } = question[0]

    // 搜尋 answer 的 content

    const answerContent: string[] = []

    answer.forEach((item: string) => {
        question[0].options.forEach((option, index) => {
            if (item === option.id) {
                answerContent.push(question[0].options[index].content)
            }
        })
    })
    return NextResponse.json({
        id,
        answer: answerContent,
    })
}
