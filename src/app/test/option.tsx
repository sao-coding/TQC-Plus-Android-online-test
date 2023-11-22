"use client"

import { useState, useEffect } from "react"
import { Exam } from "@/types/exam"

const Option = ({ id, type, option }: { id: string; type: string; option: Exam["options"][0] }) => {
    const [checked, setChecked] = useState<boolean>(false)
    useEffect(() => {
        console.log(checked)
    }, [checked])
    return (
        <label
            key={option.id}
            htmlFor={option.content + option.id}
            className='break-words flex space-x-2 items-center border-b border-slate-200 pb-4'
            // className={`break-words flex space-x-2 items-center border-b border-slate-200 p-2 rounded-md ${
            //     checked ? "bg-slate-200 border-slate-200" : "bg-slate-50 border-slate-50"
            // }`}
        >
            <input
                type={type === "single" ? "radio" : "checkbox"}
                name={id}
                value={option.content}
                id={option.content + option.id}
                className='w-4 h-4 flex-shrink-0'
                // onChange={(e) => setChecked(e.target.checked)}
            />
            <div className=''>{option.content}</div>
        </label>
    )
}

export default Option
