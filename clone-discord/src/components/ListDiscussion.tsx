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
              className="w-48 justify-center items-center border border-tertiaryColor rounded-md hover:bg-slate-800 mx-auto py-4">
              <Link
                className="flex"
                href={`/friends/${currentListDiscussion.userFriendList[index].id}`}>
                <Image
                  className="rounded-sm"
                  alt="friend-image"
                  src={friend.imageUrl}
                  width={20}
                  height={20}
                />
                <Image
                  alt="friend-image"
                  src={`/${friend.state}.PNG`}
                  width={6}
                  height={6}
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
