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
  const [currentServer, setCurrentServer] = useState<
    Server | undefined
  >()
  const [
    currentListPermissions,
    setCurrentListPermissions,
  ] = useState<permissions | undefined>()
  const utils = trpc.useUtils()
  const serverId = useParams<{ serverId: string }>()

  const serverData = trpc.getServer.useQuery(serverId)
  const listPermissionsData =
    trpc.getListPermissions.useQuery(serverId)

  useEffect(() => {
    if (serverData.data) {
      setCurrentServer(serverData.data)
    }
    if (listPermissionsData.data)
      setCurrentListPermissions(listPermissionsData.data)
  }, [serverData.data, listPermissionsData.data])
  console.log(currentListPermissions)
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
          {currentServer && currentListPermissions && (
            <ServerLeftListChannel
              {...currentServer}
              refetch={serverData.refetch}
              listPermissions={currentListPermissions}
            />
          )}
        </div>
        <div className="flex-grow flex-1">{children}</div>
        <div className="ml-auto w-52 bg-secondaryColor  z-50 h-full flex flex-col">
          {currentServer && currentListPermissions && (
            <ServerRightListMember
              {...currentServer}
              listPermissions={currentListPermissions}
            />
          )}
        </div>
      </main>
    </div>
  )
}
