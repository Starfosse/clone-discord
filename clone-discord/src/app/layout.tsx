import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import SideLeftBar from "@/components/SideLeftBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Clone Discord",
  description: "Copie de Discord",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          inter.className
        )}>
        <main className="relative flex flex-col min-h-screen">
          <SideLeftBar />
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  )
}
