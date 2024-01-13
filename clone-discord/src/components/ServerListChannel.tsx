"use client"
import { trpc } from "@/app/_trpc/client"
import { Channel } from "@prisma/client"
import { useEffect, useState } from "react"

interface Server {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

const ServerListChannel = (currentServer: Server) => {
  const serverId = { serverId: currentServer.id }
  const channelsData = trpc.getChannels.useQuery(serverId)
  const [channels, setChannels] = useState<
    Channel[] | undefined
  >()
  useEffect(() => {
    if (channelsData.data) setChannels(channelsData.data)
  }, [channelsData.data])

  const textChannels = channels?.filter(
    (channel) => channel.type === "TEXT"
  )
  const audioChannels = channels?.filter(
    (channel) => channel.type === "AUDIO"
  )
  return (
    <>
      <div className="flex flex-col items-start">
        <div className="py-1 text-white">
          Salons textuel
        </div>
        {textChannels &&
          textChannels.map((textChannel) => (
            <div
              className="text-muted-foreground"
              key={textChannel.id}>
              &nbsp;&nbsp;{textChannel.name}
            </div>
          ))}
        <div className="py-1 text-white">Salons audio</div>
        {audioChannels &&
          audioChannels.map((audioChannel) => (
            <div
              className="text-muted-foreground"
              key={audioChannel.id}>
              &nbsp;&nbsp;{audioChannel.name}
            </div>
          ))}
      </div>
    </>
  )
}
//Todo trier par date de création, et prendre en comtpe si c'est une catégorie ou non
export default ServerListChannel
