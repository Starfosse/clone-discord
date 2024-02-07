"use client"

import { trpc } from "@/app/_trpc/client"
import { Server } from "@prisma/client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ServerLeftHeader from "./ServerLeftHeader"
import ServerLeftListChannel from "./ServerLeftListChannel"
import ServerListMember from "./ServerRightListMember"
import { Separator } from "./ui/separator"

const ServerLeftSideBar = () => {
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
    <div className="flex h-full">
      <div className="w-52 bg-secondaryColor sticky z-50 h-full flex flex-col">
        {currentServer && (
          <ServerLeftHeader
            {...currentServer}
            refetch={serverData.refetch}
          />
        )}
        <Separator className=" w-4/5 mb-4 justify-center mx-auto" />
        {currentServer && (
          <ServerLeftListChannel
            {...currentServer}
            refetch={serverData.refetch}
          />
        )}
      </div>
      <div className="ml-auto w-52 bg-secondaryColor sticky z-50 h-full flex flex-col">
        {currentServer && (
          <ServerListMember {...currentServer} />
        )}
      </div>
    </div>
  )
}

export default ServerLeftSideBar
