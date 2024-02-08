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

interface ChannelVideoProps {
  currentChannel: Channel
  currentUser: User
}

const ChannelVideo = (cVPRops: ChannelVideoProps) => {
  const [token, setToken] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${cVPRops.currentChannel.name}&username=${cVPRops.currentUser.pseudo}`
        )
        const data = await resp.json()
        setToken(data.token)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [
    cVPRops.currentChannel.name,
    cVPRops.currentUser.pseudo,
  ])

  if (token === "") {
    return <div>Getting token...</div>
  }

  return (
    // <div className="text-white flex flex-col h-full max-h-screen">
    //   <div className=" bg-primaryColor h-14 sticky w-full flex items-center pl-4 text-2xl border-b border-b-black z-50">
    //     <Video width={20} />
    //     &nbsp;{currentChannel?.name}
    //   </div>
    <LiveKitRoom
      video={true}
      audio={false}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{
        maxHeight: "calc(100vh - 3.5rem)",
        paddingBottom: "4.5rem",
      }}>
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

export default ChannelVideo
