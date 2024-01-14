"use client"

import { trpc } from "@/app/_trpc/client"
import { Channel, ChannelGroup } from "@prisma/client"
import { useEffect, useState } from "react"
import ChannelDisplay from "./ChannelDisplay"
import { ArrowBigDown } from "lucide-react"

interface channnelsGroupProps {
  channelsGroup: ChannelGroup
}

const ChannelsGroup = (cGProps: channnelsGroupProps) => {
  const ChannelGroupId = { id: cGProps.channelsGroup.id }
  const channels =
    trpc.getChannelsByGroupId.useQuery(ChannelGroupId)
  const [currentChannels, setCurrentChannels] = useState<
    Channel[] | undefined
  >()
  useEffect(() => {
    if (channels.data) setCurrentChannels(channels.data)
  }, [channels.data])
  // const [showModal]
  return (
    <div className="mt-4 pl-2">
      <div className="flex w-full items-center">
        {<ArrowBigDown />}{" "}
        <div>{cGProps.channelsGroup.name}</div>{" "}
        <div className="justify-end ml-auto text-muted-foreground pr-2">
          <button className="text-xl">+</button>
        </div>
      </div>
      {currentChannels &&
        currentChannels.map((channel) => (
          <div key={channel.id}>
            <ChannelDisplay channel={channel} />
          </div>
        ))}
    </div>
  )
}

export default ChannelsGroup
