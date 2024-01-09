"use client"

import { useParams } from "next/navigation"
import ServerLeftHeader from "./ServerLeftHeader"
import { trpc } from "@/app/_trpc/client"
import { Separator } from "./ui/separator"
import ServerListChannel from "./ServerListChannel"

const ServerSideBar = () => {
  const serverId = useParams<{ serverId: string }>()
  const { data: currentServer } =
    trpc.getServer.useQuery(serverId)
  // console.log(currentServer)
  return (
    <div className="flex h-full">
      <div className="w-52 bg-secondaryColor sticky z-50 h-full flex flex-col">
        {currentServer && (
          <ServerLeftHeader {...currentServer} />
        )}
        <Separator className=" w-4/5 mb-4 justify-center mx-auto" />
        {currentServer && (
          <ServerListChannel {...currentServer} />
        )}
      </div>
    </div>
  )
}

export default ServerSideBar
