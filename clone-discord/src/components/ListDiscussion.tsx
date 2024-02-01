"use client"

import { trpc } from "@/app/_trpc/client"
import { User, UserFriend, inputChat } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ListDiscussion {
  userFriendList: UserFriend[]
  listFriends: User[]
}

const ListDiscussion = () => {
  const listDiscussionData =
    trpc.getListDiscussion.useQuery()
  const [currentListDiscussion, setCurrentListDiscussion] =
    useState<ListDiscussion | undefined>()
  useEffect(() => {
    if (listDiscussionData.data)
      setCurrentListDiscussion(listDiscussionData.data)
  }, [listDiscussionData.data])
  return (
    <div className="flex flex-col gap-2 w-full">
      {currentListDiscussion &&
        currentListDiscussion.listFriends.map(
          (friend, index) => (
            <div
              key={friend.id}
              className="relative w-48 justify-center items-center border border-tertiaryColor rounded-md hover:bg-slate-800 mx-auto py-2 ">
              <Link
                className="flex"
                href={`/friends/${currentListDiscussion.userFriendList[index].id}`}>
                <Image
                  className="rounded-full ml-1 aspect-square my-1"
                  alt="friend-image"
                  src={friend.imageUrl}
                  width={24}
                  height={24}
                />
                <Image
                  alt="friend-image"
                  className="rounded-full absolute top-7 left-[1.15rem] border-2 border-tertiaryColor"
                  src={`/${friend.state}.png`}
                  width={10}
                  height={10}
                />
                <div className="pl-4">{friend.pseudo}</div>
              </Link>
            </div>
          )
        )}
    </div>
  )
}

export default ListDiscussion
