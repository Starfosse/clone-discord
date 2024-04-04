import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import SideLeftBar from "@/components/SideLeftBar"
import { ClerkProvider } from "@clerk/nextjs"
import Provider from "./_trpc/Provider"
import { Toaster } from "@/components/ui/sonner"
import { SocketProvider } from "@/components/socket-provider"

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
      <html
        lang="fr"
        className="h-full max-h-full overflow-auto">
        <body
          className={cn(
            "relative h-full font-sans antialiased ",
            inter.className
          )}>
          <main className="relative flex min-h-screen max-h-screen">
            <SocketProvider>
              <Provider>
                <SideLeftBar />
                <div className="flex-grow flex-1 bg-black">
                  {/* retirer le bg*/}
                  {children}
                </div>
                <Toaster position="top-center" />
              </Provider>
            </SocketProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
