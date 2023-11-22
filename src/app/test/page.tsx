"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Container from "@/components/Container"
import Option from "./option"
import { Exam, ExamAnswer } from "@/types/exam"

const TestPage = () => {
    const [topic, setTopic] = useState<Exam[]>([])
    const [inputLength, setInputLength] = useState<number>(0)
    const router = useRouter()

    useEffect(() => {
        setInputLength(Array.from(document.querySelectorAll("input")).length)
    }, [inputLength])

    useEffect(() => {
        // fetch("/api/create" 把 data  存到 localStorage
        const fetchDate = async () => {
            // 讀取 total
            const total = localStorage.getItem("total") ?? 30
            const res = await fetch(`/api/create?total=${total}`)
            const data = await res.json()
            setTopic(data)
            localStorage.setItem("topic", JSON.stringify(data))
            // 狀態 考試中
            localStorage.setItem("status", "testing")
        }
        if (localStorage.getItem("topic") === null && localStorage.getItem("status") === null) {
            fetchDate()
        } else {
            setTopic(JSON.parse(localStorage.getItem("topic") ?? ""))
        }
    }, [])

    useEffect(() => {
        // 若是 localStorage 有 answer 就把使用者的答案 填入選項
        if (localStorage.getItem("answer")) {
            const answer: ExamAnswer[] = JSON.parse(localStorage.getItem("answer") ?? "")
            // setAnswer(answer)
            answer.forEach((item) => {
                const inputs = Array.from(document.querySelectorAll("input"))
                inputs.forEach((input) => {
                    if (input.name === item.id) {
                        if (item.answer.includes(input.value)) {
                            input.checked = true
                            // label
                            input.parentElement?.classList.remove("bg-slate-50")
                            input.parentElement?.classList.add("bg-slate-200")
                        }
                    }
                })
            })
        }
    }, [inputLength])

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // 取得所有 input 去除 submit
        const inputs = Array.from(e.currentTarget.querySelectorAll("input")).filter(
            (item) => item.type !== "submit"
        )
        // 取得所有 input 的 value
        const values = inputs.map((item) => item.value)
        // 取得所有 input 的 checked
        const checked = inputs.map((item) => item.checked)
        console.log("checked", checked)
        // 取得所有 input 的 name
        const names = inputs.map((item) => item.name)

        console.log("names", names)

        // 若是同name 算一題
        const topicList = names.filter((item, index) => names.indexOf(item) === index)
        console.log("question", topicList)

        // 檢查 此 id 之題目 的 answer 是否有作答
        // 若是單選題，只能選一個
        // 若是多選題，可以選多個
        const check: boolean[] = []
        topicList.forEach((name, index) => {
            const question = topic.filter((item) => item.id === name)
            console.log(question, index)
            if (question[0].type === "single") {
                // if (checked[index] === false) {
                //     check.push(false)
                // } else {
                //     check.push(true)
                // }
                // 選擇此ID 的選項檢查是否有勾選 單選題 只能選一個
                const checkAnswer = checked.filter((item, index) => names[index] === name)
                console.log("checkAnswer", checkAnswer)
                if (checkAnswer.includes(true)) {
                    check.push(true)
                } else {
                    check.push(false)
                }
            } else {
                // 選擇此ID 的選項檢查是否有勾選 多選題
                const checkAnswer = checked.filter((item, index) => names[index] === name)
                console.log("checkAnswer", checkAnswer)
                // 檢查是否有勾選兩個以上
                const checkAnswerLength = checkAnswer.filter((item) => item === true)
                console.log("checkAnswerLength", checkAnswerLength)
                if (checkAnswerLength.length >= 2) {
                    check.push(true)
                } else {
                    check.push(false)
                }
            }
        })

        console.log("check", check)

        // 檢查是否有未作答的題目

        if (check.includes(false)) {
            // 哪些題目沒有作答告訴他此ID 是 topic 的 哪一個ID 並選找ID 的 索引值
            // const index = check.findIndex((item) => item === false)
            // console.log("index", index)
            // const id = list[index]
            // console.log("id", id)
            // const question = topic.filter((item) => item.id === id)
            // console.log("question", question)
            // alert(`第 ${question[0].id} 題沒有作答`)
            const notify: number[] = []
            check.forEach((item, index) => {
                if (item === false) {
                    notify.push(index + 1)
                }
            })

            alert(`第 ${notify.join(", ")} 題沒有作答\n共 ${notify.length} 題\n請做答完畢再提交`)
        } else {
            // 作答完畢，將答案存到 localStorage
            const answer: ExamAnswer[] = []
            topic.forEach((question, index) => {
                // 找尋此ID 的選項有哪些被勾選
                const answerList = checked.filter((item, index) => names[index] === question.id)
                console.log("answerList", answerList)
                // 找尋此ID 的選項的 value
                const answerContent = values.filter((item, index) => names[index] === question.id)
                console.log("answerContent", answerContent)
                // 將 answerList 的 true 的 index 找出來
                const answerIndex: number[] = []
                answerList.forEach((item, index) => {
                    if (item === true) {
                        answerIndex.push(index)
                    }
                })
                console.log("answerIndex", answerIndex)
                // 將 answerIndex 的值 去找 answerContent 的值
                const answerContentList: string[] = []
                answerIndex.forEach((item) => {
                    answerContentList.push(answerContent[item])
                })
                console.log("answerContentList", answerContentList)

                answer.push({
                    id: question.id,
                    answer: answerContentList,
                })
            })
            console.log("answer", answer)
            // setAnswer(answer)
            localStorage.setItem("answer", JSON.stringify(answer))
            // 狀態 考試結束
            localStorage.setItem("status", "end")
            // 跳轉到結果頁面
            router.push("/result")
        }
    }

    return (
        <Container>
            <div className='p-4 h-full w-full'>
                <form className='flex flex-col space-y-4' onSubmit={(e) => submit(e)}>
                    {topic.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className='p-3 flex flex-col space-y-2 border-dashed border-2 border-slate-200 rounded-xl overflow-x-auto md:overflow-visible'
                            >
                                <div className='flex items-center'>
                                    <h1 className='text-xl font-bold text-slate-900'>
                                        第 {index + 1} 題
                                    </h1>
                                    <p className='text-slate-500 ml-2'>
                                        {item.type === "single" ? "單選題" : "多選題"}
                                    </p>
                                </div>
                                {/* 自動換行 */}
                                <p className='break-words pb-2'>{item.title}</p>
                                {item.options.map((option) => {
                                    return (
                                        <Option
                                            key={option.id}
                                            id={item.id}
                                            type={item.type}
                                            option={option}
                                        />
                                    )
                                })}
                            </div>
                        )
                    })}
                    <input
                        type='submit'
                        value='提交'
                        className='bg-slate-900 text-slate-50 px-4 py-2 rounded-md shadow-md hover:bg-slate-800 transition-colors duration-200 ease-in-out'
                    />
                </form>
            </div>
        </Container>
    )
}

export default TestPage
