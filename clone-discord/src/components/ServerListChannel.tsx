"use client"
import { trpc } from "@/app/_trpc/client"
import { Channel, ChannelGroup } from "@prisma/client"
import { useEffect, useState } from "react"
import ChannelsGroup from "./ChannelsGroup"
import ChannelDisplay from "./ChannelDisplay"

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
  const ChannelsGroupsData =
    trpc.getChannelsGroups.useQuery(serverId)

  const [channelsGroups, setChannelsGroups] = useState<
    ChannelGroup[] | undefined
  >()
  const [channels, setChannels] = useState<
    Channel[] | undefined
  >()

  useEffect(() => {
    if (channelsData.data) setChannels(channelsData.data)
  }, [channelsData.data])

  useEffect(() => {
    if (ChannelsGroupsData.data)
      setChannelsGroups(ChannelsGroupsData.data)
  }, [ChannelsGroupsData.data])
  // const textChannels = channels?.filter(
  //   (channel) => channel.type === "TEXT"
  // )
  // const audioChannels = channels?.filter(
  //   (channel) => channel.type === "AUDIO"
  // )

  return (
    <>
      <div className="flex flex-col items-start text-white w-full">
        <div className="w-full">
          {channelsGroups &&
            channelsGroups.map((channelsGroup) => (
              <div key={channelsGroup.id}>
                <ChannelsGroup
                  channelsGroup={channelsGroup}
                />
              </div>
            ))}
        </div>
        <div className="pt-4 w-full">
          {channels &&
            channels.map((channel) => (
              <div key={channel.id}>
                <ChannelDisplay channel={channel} />
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

//Todo trier par date de création, et prendre en comtpe si c'est une catégorie ou non
export default ServerListChannel
