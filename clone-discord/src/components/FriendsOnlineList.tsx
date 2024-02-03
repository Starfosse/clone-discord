"use client"

import { trpc } from "@/app/_trpc/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { User, stateList } from "@prisma/client"

// interface FriendData {
//   id: string
//   userId: string
//   pseudo: string
//   imageUrl: string
//   state: stateList
//   createdAt: Date
//   updatedAt: Date
// }

// interface ResultData {
//   onlineFriendsList: FriendData[]
//   userFriendListId: string[]
// }

interface friendsData {
  onlineFriendsList: User[]
  userFriendListId: string[]
}

const FriendsOnlineList = () => {
  const data = trpc.getFriendsOnline.useQuery()
  const [friendsOnline, setFriendsOnline] = useState<
    friendsData | undefined
  >()
  useEffect(() => {
    if (data.data) setFriendsOnline(data.data)
  }, [data.data])
  return (
    <div className="flex flex-col text-white p-5 gap-3">
      {friendsOnline &&
        friendsOnline.onlineFriendsList.map(
          (friendOnline, index) => (
            <div
              key={friendOnline?.id}
              className="w-80 h-14  bg-secondaryColor rounded-lg flex items-center relative">
              <Image
                className="rounded-full ml-2 aspect-square"
                src={friendOnline.imageUrl}
                width={28}
                height={28}
                alt="ok"
              />
              <div className="relative">
                <Image
                  className="relative top-[0.67rem] right-[0.67rem] rounded-full border-2 border-tertiaryColor"
                  src={`/${friendOnline.state.toLocaleLowerCase()}.png`}
                  width={14}
                  height={14}
                  alt="ok"
                />
              </div>
              <p className="ml-4 overflow-ellipsis overflow-hidden whitespace-nowrap">
                {friendOnline?.pseudo}
              </p>
              <div className="ml-auto flex gap-2 mr-2 items-center">
                <Link
                  href={`/friends/${friendsOnline.userFriendListId[index]}`}
                  className="rounded-full bg-tertiaryColor border-[0.5rem] border-tertiaryColor ">
                  <MessageCircle />
                </Link>
              </div>
            </div>
          )
        )}
    </div>
  )
}

export default FriendsOnlineList

{
  /* <div
            key={friend?.id}
            className="w-80 h-14  bg-secondaryColor rounded-lg flex items-center">
            <Image
              className="rounded-full ml-2"
              src={friend.imageUrl ?? ""}
              width={28}
              height={28}
              alt="ok"
            />
            <div className="relative">
              <Image
                className="absolute right-0 z-10 rounded-full border-[8px] border-tertiaryColor"
                src={`/${friend?.state.toLocaleLowerCase()}.png`}
                width={16}
                height={16}
                alt="ok"
              />
            </div>
            <p className="ml-4">{friend?.pseudo}</p>
            <div className="ml-auto flex gap-2 mr-2">
              <Link href={`/friends/${friend.}`}>
                <MessageCircle />
              </Link>
              <Button className="rounded-full">⁝</Button>
            </div>
          </div> */
}
