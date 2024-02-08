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
      <div className="flex flex-col ml-6">
        {currentChannel.type !== "TEXT" &&
          currentChannelUsers?.map((user) => (
            <div
              className="flex items-center"
              key={user.id}>
              <Image
                alt="avatar"
                src={user.imageUrl}
                className="rounded-full aspect-square m-2 object-cover object-center"
                height={20}
                width={20}
              />{" "}
              <p className=" whitespace-pre-wrap break-all">
                {user.pseudo}
              </p>
            </div>
          ))}
      </div>
    </>
  )
}

export default ActiveUser
