"use client"

import { trpc } from "@/app/_trpc/client"
import { User, UserFriend } from "@prisma/client"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ListDiscussion {
  userFriendListShowable: UserFriend[]
  listFriends: User[]
}

const ListDiscussion = (who: User) => {
  const [currentListDiscussion, setCurrentListDiscussion] =
    useState<ListDiscussion | undefined>()

  const listDiscussionData =
    trpc.getListDiscussion.useQuery(who)

  useEffect(() => {
    if (listDiscussionData.data)
      setCurrentListDiscussion(listDiscussionData.data)
  }, [listDiscussionData.data])

  const { mutate: unshowDiscussion } =
    trpc.unshowDiscussion.useMutation({
      onSuccess: () => listDiscussionData.refetch(),
    })

  const handleDelete = (id: string) => {
    const discussionId = { id: id }
    unshowDiscussion(discussionId)
  }
  return (
    <div className="flex flex-col gap-2 w-full">
      {currentListDiscussion &&
        currentListDiscussion.listFriends.map(
          (friend, index) => (
            <div key={friend.id}>
              <Link
                className="gap-2 group flex relative w-48 justify-between items-center group-hover:border group-hover:border-tertiaryColor rounded-md hover:bg-slate-800 mx-auto py-2 "
                href={`/friends/${currentListDiscussion.userFriendListShowable[index].id}`}>
                <Image
                  className="rounded-full object-cover object-center ml-1 aspect-square "
                  alt="friend-image"
                  src={friend.imageUrl}
                  width={24}
                  height={24}
                />
                <Image
                  alt="friend-image"
                  className="rounded-full object-cover object-center absolute top-6 left-[1.15rem] border-2 border-tertiaryColor"
                  src={`/${friend.state}.png`}
                  width={10}
                  height={10}
                />
                <div className="pr-8 overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {friend.pseudo}
                </div>
                <button
                  className="invisible group-hover:visible pr-2"
                  onClick={() =>
                    handleDelete(
                      currentListDiscussion
                        .userFriendListShowable[index].id
                    )
                  }>
                  <X />
                </button>
              </Link>
            </div>
          )
        )}
    </div>
  )
}
export default ListDiscussion
