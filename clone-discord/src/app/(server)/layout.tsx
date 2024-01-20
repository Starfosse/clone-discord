"use client"

import { useParams } from "next/navigation"
import { trpc } from "@/app/_trpc/client"
import { useContext, useEffect, useState } from "react"
import { Server } from "@prisma/client"
import ServerLeftHeader from "@/components/ServerLeftHeader"
import { Separator } from "@/components/ui/separator"
import ServerListChannel from "@/components/ServerListChannel"
import ServerListMember from "@/components/ServerListMember"

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const serverId = useParams<{ serverId: string }>()
  const serverData = trpc.getServer.useQuery(serverId)
  const [currentServer, setCurrentServer] = useState<
    Server | undefined
  >()
  const utils = trpc.useUtils()
  useEffect(() => {
    if (serverData.data) {
      setCurrentServer(serverData.data)
    }
  }, [serverData.data])
  return (
    <div className="h-full">
      <main className="h-full relative flex">
        <div className="w-52 bg-secondaryColor sticky z-50 h-full flex flex-col">
          {currentServer && (
            <ServerLeftHeader
              {...currentServer}
              refetch={serverData.refetch}
            />
          )}
          <Separator className=" w-4/5 mb-4 justify-center mx-auto" />
          {currentServer && (
            <ServerListChannel
              {...currentServer}
              refetch={serverData.refetch}
            />
          )}
        </div>
        <div className="flex-grow flex-1">{children}</div>
        <div className="ml-auto w-52 bg-secondaryColor sticky z-50 h-full flex flex-col">
          {currentServer && (
            <ServerListMember {...currentServer} />
          )}
        </div>
      </main>
    </div>
  )
}
