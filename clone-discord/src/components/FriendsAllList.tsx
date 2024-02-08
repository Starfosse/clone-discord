"use client"

import { trpc } from "@/app/_trpc/client"
import { User } from "@prisma/client"
import { MessageCircle, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface friendsData {
  friendsList: User[]
  userFriendListId: string[]
}

const FriendsAllList = (who: User) => {
  const [friends, setFriends] = useState<
    friendsData | undefined
  >()

  const data = trpc.getAllFriends.useQuery(who)

  useEffect(() => {
    if (data.data) setFriends(data.data)
  }, [data.data])

  const { mutate: deleteFriend } =
    trpc.deleteFriend.useMutation({
      onSuccess: () => data.refetch(),
    })

  const handleClickDelete = (id: string) => {
    const userFriendId = { id: id }
    deleteFriend(userFriendId)
  }
  return (
    <div className="flex flex-col text-white p-5 gap-3">
      {friends &&
        friends.friendsList.map((friend, index) => (
          <div
            key={friend?.id}
            className="w-80 h-14  bg-secondaryColor rounded-lg flex items-center relative">
            <Image
              className="rounded-full ml-2 aspect-square object-cover object-center"
              src={friend.imageUrl}
              width={28}
              height={28}
              alt="ok"
            />
            <div className="relative">
              <Image
                className="relative top-[0.67rem] right-[0.67rem] rounded-full object-cover object-center border-2 border-tertiaryColor"
                src={`/${friend.state.toLocaleLowerCase()}.png`}
                width={14}
                height={14}
                alt="ok"
              />
            </div>
            <p className="ml-4 overflow-ellipsis overflow-hidden whitespace-nowrap">
              {friend?.pseudo}
            </p>
            <div className="ml-auto flex gap-2 mr-2 items-center">
              <Link
                href={`/friends/${friends.userFriendListId[index]}`}
                className="rounded-full  bg-tertiaryColor border-[0.5rem] border-tertiaryColor ">
                <MessageCircle />
              </Link>
              <div className="flex items-center  rounded-full bg-tertiaryColor border-[0.5rem] border-tertiaryColor">
                <button
                  onClick={() =>
                    handleClickDelete(
                      friends.userFriendListId[index]
                    )
                  }>
                  <X className="size-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default FriendsAllList
