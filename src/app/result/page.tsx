"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import Container from "@/components/Container"
import { Exam, ExamAnswer } from "@/types/exam"
import { it } from "node:test"

const ResultPage = () => {
    const [topic, setTopic] = useState<Exam[]>([])
    const [userAnswer, setUserAnswer] = useState<ExamAnswer[]>([])
    const [answer, setAnswer] = useState<ExamAnswer[]>([])
    // 正確率
    const [correct, setCorrect] = useState<number>(0)

    useEffect(() => {
        // 取消 status 考試中
        localStorage.removeItem("status")
    }, [])

    // 顯示剛剛作答的紀錄
    useEffect(() => {
        // 從 localStorage 取得 topic
        const data = JSON.parse(localStorage.getItem("topic") ?? "")
        setTopic(data)
        // 從 localStorage 取得 userAnswer
        const userAnswer: ExamAnswer[] = JSON.parse(localStorage.getItem("answer") ?? "")
        setUserAnswer(userAnswer)

        const fetchAnswer = async (id: string) => {
            const res = await fetch(`/api/answer?id=${id}`)
            const data = await res.json()
            setAnswer((prev) => [...prev, data])
        }
        // 用 topic 的 id 去取得 answer
        data.forEach((item: Exam) => {
            fetchAnswer(item.id)
        })
    }, [])

    useEffect(() => {
        // 計算正確率
        let correct = 0
        userAnswer.forEach((item) => {
            const answerCheck = answer
                .find((answerItem) => answerItem.id === item.id)
                ?.answer.toString()
            if (item.answer.toString() === answerCheck) {
                correct++
            }
        })
        setCorrect(correct)
    }, [answer])

    return (
        <Container>
            <div className='p-4 h-full w-full'>
                <div className='flex flex-col items-center justify-between mb-8 space-y-2'>
                    <h1 className='text-3xl font-bold text-slate-900'>測驗結果</h1>
                    <div className='flex items-center space-x-4'>
                        <div className=''>
                            正確率： {Math.round((correct / topic.length) * 100)}%
                        </div>
                        <div className=''>
                            正確題數： {correct} / {topic.length}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col space-y-4'>
                    {answer.length > 0 &&
                        topic.map((item: Exam, index: number) => {
                            return (
                                <div
                                    key={item.id}
                                    className='relative p-4 flex flex-col space-y-4 border-dashed border-2 border-slate-200 rounded-xl overflow-x-auto md:overflow-visible'
                                >
                                    <h2 className='text-xl font-bold text-slate-900'>
                                        第 {index + 1} 題
                                    </h2>
                                    <h2>{item.title}</h2>
                                    {/* 若答案正確 顯示 正確 若答案不正確 顯示 錯誤 */}
                                    <div className='absolute top-0 right-4'>
                                        {/* 迴圈所有 userAnswer 跟 answer 找到相同 item.id 在顯示 正確或錯誤 */}
                                        {userAnswer
                                            .find((question) => question.id === item.id)
                                            ?.answer.toString() ===
                                        answer
                                            .find((answerItem) => answerItem.id === item.id)
                                            ?.answer.toString() ? (
                                            <div className='bg-green-500 font-bold text-slate-50 px-2 py-0.5 rounded-md shadow-md'>
                                                正確
                                            </div>
                                        ) : (
                                            <div className='bg-red-500 font-bold text-slate-50 px-2 py-0.5 rounded-md shadow-md'>
                                                錯誤
                                            </div>
                                        )}
                                    </div>
                                    {/* 顯示使用者的答案 */}
                                    <div className='flex flex-col space-y-4'>
                                        <div className='border-dashed border-2 border-slate-200 rounded-xl p-2'>
                                            你的答案：
                                            {userAnswer
                                                .find((question) => question.id === item.id)
                                                ?.answer.map((item) => {
                                                    return (
                                                        <div
                                                            className='break-words border-b border-slate-200 py-2 last:border-0'
                                                            key={item}
                                                        >
                                                            {item}
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                        {/* 若答案不正確 在此顯示正確答案 */}
                                        {userAnswer
                                            .find((item) => item.id === item.id)
                                            ?.answer.toString() !==
                                            answer
                                                .find((answerItem) => answerItem.id === item.id)
                                                ?.answer.toString() && (
                                            <div className='border-dashed border-2 border-slate-200 rounded-xl p-2'>
                                                正確答案：
                                                {answer
                                                    .find((answerItem) => answerItem.id === item.id)
                                                    ?.answer.map((item) => {
                                                        return (
                                                            <div
                                                                className='break-words border-b border-slate-200 py-2 last:border-0'
                                                                key={item}
                                                            >
                                                                {item}
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                </div>
                <Link
                    href='/'
                    className='block  text-center mt-4 bg-slate-900 text-slate-50 px-4 py-2 rounded-md shadow-md hover:bg-slate-800 transition-colors duration-200 ease-in-out'
                    onClick={() => {
                        localStorage.removeItem("topic")
                        localStorage.removeItem("answer")
                    }}
                >
                    回首頁
                </Link>
            </div>
        </Container>
    )
}

export default ResultPage
