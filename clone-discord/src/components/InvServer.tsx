"use client"

import { trpc } from "@/app/_trpc/client"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { Server } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface InvServerProps {
  serverId: string
}

const InvServer = ({ serverId }: InvServerProps) => {
  const [currentServer, setCurrentServer] = useState<
    Server | undefined
  >()
  const router = useRouter()
  const utils = trpc.useUtils()
  const serverData = trpc.getServer.useQuery({ serverId })

  useEffect(() => {
    if (serverData.data) setCurrentServer(serverData.data)
  }, [serverData.data])

  const { mutate: addMember } =
    trpc.createMember.useMutation({
      onSuccess: () => {
        utils.getUserListServ.invalidate()
        router.push(`/server/${currentServer?.id}`)
      },
    })

  const handleAddMember = () => {
    addMember({ serverId })
  }
  return (
    <div className="rounded-sm bg-tertiaryColor flex flex-col p-2 m-2">
      <div>Tu as été invité à rejoindre un serveur</div>
      {currentServer && (
        <div className="flex w-80 items-center gap-2">
          <div className="flex-shrink-0 p-2">
            <Image
              src={currentServer.imageUrl}
              height={30}
              width={30}
              alt="image server"
              className="rounded-full object-cover object-center aspect-square "
            />
          </div>
          <p className="truncate">{currentServer.name}</p>
          <Button
            className="mr-auto bg-primaryColor"
            onClick={() => handleAddMember()}>
            Rejoindre
          </Button>
        </div>
      )}
    </div>
  )
}

export default InvServer
