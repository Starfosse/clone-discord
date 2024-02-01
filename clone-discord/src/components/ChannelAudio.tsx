"use client"

import "@livekit/components-styles"
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  useTracks,
  RoomAudioRenderer,
  ControlBar,
} from "@livekit/components-react"
import { useEffect, useState } from "react"
import { Track } from "livekit-client"
import { Channel, Member, User } from "@prisma/client"
import { Hash, Headphones } from "lucide-react"
import { trpc } from "@/app/_trpc/client"
import { useDisconnectButton } from "@livekit/components-react"

interface ChannelAudioProps {
  currentChannel: Channel
  currentUser: User
}

const ChannelAudio = (cAPRops: ChannelAudioProps) => {
  const [token, setToken] = useState("")
  useEffect(() => {
    ;(async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${cAPRops.currentChannel.name}&username=${cAPRops.currentUser.pseudo}`
        )
        const data = await resp.json()
        setToken(data.token)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  if (token === "") {
    return <div>Getting token...</div>
  }
  return (
    <>
      <LiveKitRoom
        video={false}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        data-lk-theme="default"
        style={{ height: "100vh - 3.5rem" }}>
        <MyVideoConference />
        <RoomAudioRenderer />
        <ControlBar />
      </LiveKitRoom>
    </>
  )
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      {
        source: Track.Source.Camera,
        withPlaceholder: true,
      },
      {
        source: Track.Source.ScreenShare,
        withPlaceholder: false,
      },
    ],
    { onlySubscribed: false }
  )
  return (
    <GridLayout
      tracks={tracks}
      style={{
        height:
          "calc(100vh - var(--lk-control-bar-height))",
      }}>
      <ParticipantTile />
    </GridLayout>
  )
}

export default ChannelAudio
