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

interface ChannelAudioProps {
  currentChannel: Channel
  currentUser: User
}

const ChannelAudio = (cAPRops: ChannelAudioProps) => {
  // console.log(cAPRops.currentChannel.id)
  // console.log(cAPRops.currentUser.id)
  const ChannelId = { id: cAPRops.currentChannel.id }
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
    // <div className="text-white flex flex-col max-h-screen">
    //   <div className=" bg-primaryColor h-14 sticky w-full flex items-center pl-4 text-2xl border-b border-b-black z-50">
    //     <Headphones width={20} />
    //     &nbsp;{currentChannel?.name}
    //   </div>
    <LiveKitRoom
      video={false}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: "100vh - 3.5rem" }}>
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference />
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen 
      share tracks and to leave the room. */}
      <ControlBar />
    </LiveKitRoom>
    // </div>
  )
}

//todo :gérer la talle de l'affichage avec l'en-tête
function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
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
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  )
}

export default ChannelAudio
