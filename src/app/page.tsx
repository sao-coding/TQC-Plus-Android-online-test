"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

const HomePage = () => {
    const [total, setTotal] = useState(30)

    useEffect(() => {
        // 取消 localStorage 所有資料
        localStorage.clear()
    }, [])

    useEffect(() => {
        // total 存到 localStorage
        localStorage.setItem("total", JSON.stringify(total))
    }, [total])

    return (
        <div className='p-4 h-full w-full flex flex-col justify-center items-center'>
            <div className='mb-10'>
                <h1 className='text-3xl font-bold text-slate-900 text-center'>
                    TQC+ Android 證照 測驗
                </h1>
                <p className='text-slate-700 text-center'>
                    這是一個網站，可以讓你在手機上測驗 TQC+ 的證照。
                </p>
                <div className='flex flex-col justify-center items-center'>
                    {/* 選擇題數： */}
                    <div className='flex space-x-2 items-center justify-center mt-4'>
                        <input
                            type='number'
                            className='w-20 h-10 border border-slate-200 rounded-md px-2 py-1 text-slate-900'
                            value={total}
                            onChange={(e) => {
                                // 不能小於 30 也不能負數 也不能大於 331
                                // if (Number(e.target.value) < 30) {
                                //     setTotal(30)
                                // } else if (Number(e.target.value) > 331) {
                                //     setTotal(331)
                                // } else {
                                //     setTotal(Number(e.target.value))
                                // }
                                setTotal(Number(e.target.value))
                            }}
                        />
                        <div>題</div>
                    </div>
                    <Link
                        href='/test'
                        className='mt-4 bg-slate-900 text-slate-50 px-4 py-2 rounded-md shadow-md hover:bg-slate-800 transition-colors duration-200 ease-in-out'
                    >
                        開始測驗
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage
