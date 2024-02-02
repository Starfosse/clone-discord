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
  refetch: () => Promise<any>
}

const ServerLeftListChannel = (currentServer: Server) => {
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
    if (channelsData.data) {
      setChannels(channelsData.data)
    }
  }, [channelsData.data])

  useEffect(() => {
    if (ChannelsGroupsData.data) {
      setChannelsGroups(ChannelsGroupsData.data)
    }
  }, [ChannelsGroupsData.data])
  return (
    <>
      <div className="flex flex-col items-start text-white w-full overflow-auto">
        <div className="w-full">
          {channelsGroups &&
            channelsGroups.map((channelsGroup) => (
              <div key={channelsGroup.id}>
                <ChannelsGroup
                  refetchChannels={channelsData.refetch}
                  refetchChannelsGroups={
                    ChannelsGroupsData.refetch
                  }
                  channelsGroup={channelsGroup}
                  refetchServer={currentServer.refetch}
                />
              </div>
            ))}
        </div>
        <div className="pt-4 w-full">
          {channels &&
            channels.map(
              (channel) =>
                !channel.channelGroupId && (
                  <div key={channel.id}>
                    <ChannelDisplay
                      refetchChannels={
                        ChannelsGroupsData.refetch
                      }
                      refetchChannelsGroups={
                        ChannelsGroupsData.refetch
                      }
                      refetchServer={currentServer.refetch}
                      channel={channel}
                    />
                  </div>
                )
            )}
        </div>
      </div>
    </>
  )
}

export default ServerLeftListChannel
