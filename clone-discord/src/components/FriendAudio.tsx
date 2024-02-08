"use client"

import { trpc } from "@/app/_trpc/client"
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react"
import "@livekit/components-styles"
import { User } from "@prisma/client"
import { Track } from "livekit-client"
import { useEffect, useState } from "react"

interface FriendAudioProps {
  discussionId: string
}

const FriendAudio = (fAProps: FriendAudioProps) => {
  const userData = trpc.getUser.useQuery()
  const [user, setUser] = useState<User | undefined>()
  useEffect(() => {
    if (userData.data) setUser(userData.data)
  }, [userData.data])
  const [token, setToken] = useState("")
  useEffect(() => {
    ;(async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${fAProps.discussionId}&username=${user?.pseudo}`
        )
        const data = await resp.json()
        setToken(data.token)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [fAProps.discussionId, user?.pseudo])

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

export default FriendAudio
