"use client"

import { trpc } from "@/app/_trpc/client"
import ServerLeftHeader from "@/components/ServerLeftHeader"
import ServerLeftListChannel from "@/components/ServerLeftListChannel"
import ServerRightListMember from "@/components/ServerRightListMember"
import { Separator } from "@/components/ui/separator"
import permissions from "@/lib/interface/permissions"
import { Server } from "@prisma/client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

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
  const listPermissionsData =
    trpc.getListPermissions.useQuery(serverId)
  const utils = trpc.useUtils()
  const [
    currentListPermissions,
    setCurrentListPermissions,
  ] = useState<permissions | undefined>()
  useEffect(() => {
    if (serverData.data) {
      setCurrentServer(serverData.data)
    }
    if (listPermissionsData.data)
      setCurrentListPermissions(listPermissionsData.data)
  }, [serverData.data, listPermissionsData.data])
  return (
    <div className="h-full">
      <main className="h-full relative flex">
        <div className="w-52 bg-secondaryColor  z-50 h-full flex flex-col">
          {currentServer && currentListPermissions && (
            <ServerLeftHeader
              {...currentServer}
              refetch={serverData.refetch}
              listPermissions={currentListPermissions}
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
        <div className="flex-grow flex-1">{children}</div>
        <div className="ml-auto w-52 bg-secondaryColor  z-50 h-full flex flex-col">
          {currentServer && (
            <ServerRightListMember {...currentServer} />
          )}
        </div>
      </main>
    </div>
  )
}
