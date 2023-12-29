import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import SideLeftBar from "@/components/SideLeftBar"
import { ClerkProvider } from "@clerk/nextjs"
import Provider from "./_trpc/Provider"

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
    <ClerkProvider>
      <html lang="fr" className="h-full">
        <body
          className={cn(
            "relative h-full font-sans antialiased",
            inter.className
          )}>
          <main className="relative flex flex-col min-h-screen">
            <Provider>
            <SideLeftBar />
            <div className="flex-grow flex-1">
              {children}
            </div>
            </Provider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
