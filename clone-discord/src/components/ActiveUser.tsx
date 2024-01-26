"use client"

import { trpc } from "@/app/_trpc/client"
import { Channel, User } from "@prisma/client"
import Image from "next/image"
import { useEffect, useState } from "react"

const ActiveUser = (currentChannel: Channel) => {
  const channelId = { id: currentChannel.id }
  const activeUsers =
    trpc.getChannelUsers.useQuery(channelId)
  const [currentChannelUsers, setCurrentChannelUsers] =
    useState<undefined | User[]>()
  useEffect(() => {
    if (activeUsers.data)
      setCurrentChannelUsers(activeUsers.data)
  }, [activeUsers.data])

  return (
    <>
      <div className="flex flex-col ml-10">
        {currentChannel.type !== "TEXT" &&
          currentChannelUsers?.map((user) => (
            <div className="flex" key={user.id}>
              {/* <Image alt="avatar" fill src={user.imageUrl} />{" "} */}
              {user.pseudo}
            </div>
          ))}
      </div>
    </>
  )
}

//todo: gérer l'imageUser
//todo si l'user leave, le retirer du display en dessous du channel
export default ActiveUser
