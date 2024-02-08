"use client"

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react"
import "@livekit/components-styles"
import { Channel, User } from "@prisma/client"
import { Track } from "livekit-client"
import { useEffect, useState } from "react"

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
  }, [
    cAPRops.currentChannel.name,
    cAPRops.currentUser.pseudo,
  ])

  if (token === "") {
    return <div>Getting token...</div>
  }
  return (
    <>
      <div className="text-white flex flex-col h-full max-h-screen">
        <div className=" bg-primaryColor h-14 w-full flex items-center pl-4 text-2xl border-b border-b-black z-50">
          {/* <audio width={20} /> */}
          &nbsp;{cAPRops.currentChannel?.name}
        </div>
        <LiveKitRoom
          video={false}
          audio={true}
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          data-lk-theme="default"
          style={{
            maxHeight: "calc(100vh - 3.5rem)",
            paddingBottom: "4.5rem",
          }}>
          <MyVideoConference />
          <RoomAudioRenderer />
          <ControlBar />
        </LiveKitRoom>
      </div>
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
