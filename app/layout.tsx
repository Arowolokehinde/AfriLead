import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "AfriLead - Connect with Mentors for Career & Learning Guidance",
  description:
    "Help young people easily connect with mentors for career or learning guidance. Match people → Enable conversations → Track basic impact.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Navbar />
        <Suspense fallback={null}>{children}</Suspense>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
