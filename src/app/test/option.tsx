"use client"

import { Exam } from "@/types/exam"

const Option = ({ id, type, option }: { id: string; type: string; option: Exam["options"][0] }) => {
    const checkOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 若 type 是 single 就把其他的選項取消
        if (type === "single") {
            const inputs = Array.from(document.querySelectorAll("input"))
            inputs.forEach((input) => {
                console.log(input.name, id, input.value)
                if (input.name === id) {
                    const label = input.parentElement
                    console.log(label)
                    label?.classList.remove("bg-slate-200")
                    label?.classList.add("bg-slate-50")
                }
            })
        }
        e.target.parentElement?.classList.toggle("bg-slate-50")
        e.target.parentElement?.classList.toggle("bg-slate-200")
    }

    return (
        <>
            <label
                key={option.id}
                htmlFor={option.content + option.id}
                className='break-words flex space-x-2 items-center p-2 rounded-md bg-slate-50'
            >
                <input
                    type={type === "single" ? "radio" : "checkbox"}
                    name={id}
                    value={option.content}
                    id={option.content + option.id}
                    className='w-4 h-4 flex-shrink-0'
                    onChange={(e) => checkOption(e)}
                />
                <div className=''>{option.content}</div>
            </label>
            <hr className='last:border-0 border-slate-200' />
        </>
    )
}

export default Option
