"use client"

import { trpc } from "@/app/_trpc/client"
import { Server } from "@prisma/client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ServerLeftHeader from "./ServerLeftHeader"
import ServerLeftListChannel from "./ServerLeftListChannel"
import ServerListMember from "./ServerRightListMember"
import { Separator } from "./ui/separator"
import permissions from "@/lib/interface/permissions"

const ServerLeftSideBar = () => {
  const serverId = useParams<{ serverId: string }>()
  const [currentServer, setCurrentServer] = useState<
    Server | undefined
  >()
  const [
    currentListPermissions,
    setCurrentListPermissions,
  ] = useState<permissions | undefined>()

  const listPermissionsData =
    trpc.getListPermissions.useQuery(serverId)
  const serverData = trpc.getServer.useQuery(serverId)

  useEffect(() => {
    if (serverData.data) {
      setCurrentServer(serverData.data)
    }
    if (listPermissionsData.data)
      setCurrentListPermissions(listPermissionsData.data)
  }, [serverData.data])
  return (
    <div className="flex h-full">
      <div className="w-52 bg-secondaryColor sticky z-50 h-full flex flex-col">
        {currentServer && currentListPermissions && (
          <ServerLeftHeader
            {...currentServer}
            refetch={serverData.refetch}
            listPermissions={currentListPermissions}
          />
        )}
        <Separator className=" w-4/5 mb-4 justify-center mx-auto" />
        {currentServer && currentListPermissions && (
          <ServerLeftListChannel
            {...currentServer}
            refetch={serverData.refetch}
            listPermissions={currentListPermissions}
          />
        )}
      </div>
      <div className="ml-auto w-52 bg-secondaryColor sticky z-50 h-full flex flex-col">
        {currentServer && currentListPermissions && (
          <ServerListMember
            {...currentServer}
            listPermissions={currentListPermissions}
          />
        )}
      </div>
    </div>
  )
}

export default ServerLeftSideBar
