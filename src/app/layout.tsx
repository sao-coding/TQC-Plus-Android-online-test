import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Next.js + TypeScript + Tailwind CSS",
    description: "Next.js + TypeScript + Tailwind CSS",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='zh-Hant-TW'>
            <body className={inter.className}>{children}</body>
        </html>
    )
}
