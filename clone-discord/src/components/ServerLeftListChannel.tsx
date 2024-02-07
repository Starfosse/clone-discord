"use client"
import { trpc } from "@/app/_trpc/client"
import permissions from "@/lib/interface/permissions"
import { Channel, ChannelGroup } from "@prisma/client"
import { useEffect, useState } from "react"
import ChannelDisplay from "./ChannelDisplay"
import ChannelsGroup from "./ChannelsGroup"

interface Server {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  userId: string
  createdAt: Date
  updatedAt: Date
  refetch: () => Promise<any>
  listPermissions: permissions
}

const ServerLeftListChannel = (currentServer: Server) => {
  const serverId = { serverId: currentServer.id }
  const [channelsGroups, setChannelsGroups] = useState<
    ChannelGroup[] | undefined
  >()
  const [channels, setChannels] = useState<
    Channel[] | undefined
  >()

  const channelsData = trpc.getChannels.useQuery(serverId)
  const ChannelsGroupsData =
    trpc.getChannelsGroups.useQuery(serverId)

  useEffect(() => {
    if (channelsData.data) {
      setChannels(channelsData.data)
    }
    if (ChannelsGroupsData.data) {
      setChannelsGroups(ChannelsGroupsData.data)
    }
  }, [channelsData.data, ChannelsGroupsData.data])

  return (
    <>
      <div className="flex flex-col items-start text-white w-full overflow-auto">
        <div className="w-full">
          {channelsGroups &&
            currentServer.listPermissions.view_Channel &&
            channelsGroups.map((channelsGroup) => (
              <div key={channelsGroup.id}>
                <ChannelsGroup
                  listPermissions={
                    currentServer.listPermissions
                  }
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
            currentServer.listPermissions.view_Channel &&
            channels.map(
              (channel) =>
                !channel.channelGroupId && (
                  <div key={channel.id}>
                    <ChannelDisplay
                      listPermissions={
                        currentServer.listPermissions
                      }
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
