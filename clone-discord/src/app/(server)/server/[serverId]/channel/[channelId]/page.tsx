"use client"

import { trpc } from "@/app/_trpc/client"
import ChatDisplay from "@/components/ChatDisplay"
import InputChannel from "@/components/InputChannel"
import { Channel } from "@prisma/client"
import { Hash, Headphones, Video } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const ChannelIdPage = () => {
  const channelId = useParams<{ channelId: string }>()
  const channelData =
    trpc.getChannelById.useQuery(channelId)
  const [currentChannel, setCurrentChannel] = useState<
    Channel | undefined
  >()
  useEffect(() => {
    if (channelData.data)
      setCurrentChannel(channelData.data)
  }, [channelData.data])
  return (
    <>
      <div className="text-white flex flex-col h-full">
        <div className="bg-primaryColor h-14 sticky w-full flex items-center pl-4 text-2xl">
          {currentChannel &&
          currentChannel.type === "TEXT" ? (
            <Hash width={20} />
          ) : currentChannel?.type === "AUDIO" ? (
            <Headphones width={20} />
          ) : (
            <Video width={20} />
          )}
          &nbsp;{currentChannel?.name}
        </div>
        {currentChannel && (
          <ChatDisplay {...currentChannel} />
        )}
        <div className="mt-auto">
          {currentChannel && (
            <InputChannel {...currentChannel} />
          )}
        </div>
      </div>
    </>
  )
}

export default ChannelIdPage
