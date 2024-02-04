"use client"

import { trpc } from "@/app/_trpc/client"
import ChannelAudio from "@/components/ChannelAudio"
import ChannelText from "@/components/ChannelText"
import ChannelVideo from "@/components/ChannelVideo"
import { Channel, User } from "@prisma/client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const ChannelIdPage = () => {
  const utils = trpc.useUtils()
  const channelId = useParams<{ channelId: string }>()
  const channelData =
    trpc.getChannelById.useQuery(channelId)
  const [currentChannel, setCurrentChannel] = useState<
    Channel | undefined
  >()
  const userData = trpc.getUser.useQuery()
  const [currentUser, setCurrentUser] = useState<
    User | undefined
  >()
  const whoData = trpc.getMemberByUser.useQuery(channelId)
  const { mutate: joinChannel } =
    trpc.joinMemberToChannel.useMutation({
      onSuccess: () => utils.getChannelUsers.invalidate(),
    })
  useEffect(() => {
    if (channelData.data)
      setCurrentChannel(channelData.data)
    if (userData.data) setCurrentUser(userData.data)
    if (whoData.data && channelData.data) {
      const MemberIdChannelId = {
        memberId: whoData.data.id,
        channelId: channelData.data.id,
      }
      joinChannel(MemberIdChannelId)
    }
  }, [channelData.data, userData.data, whoData.data])

  return (
    <>
      {currentChannel &&
        currentUser &&
        (currentChannel.type === "TEXT" ? (
          <ChannelText {...currentChannel} />
        ) : currentChannel.type === "AUDIO" ? (
          <ChannelAudio
            currentChannel={currentChannel}
            currentUser={currentUser}
          />
        ) : (
          <ChannelVideo
            currentChannel={currentChannel}
            currentUser={currentUser}
          />
        ))}
    </>
  )
}

export default ChannelIdPage
