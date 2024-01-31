"use client"
import { trpc } from "@/app/_trpc/client"
import { User } from "@prisma/client"
import { MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

interface friendsData {
  friendsList: User[]
  userFriendListId: string[]
}

const FriendsList = () => {
  const data = trpc.getAllFriends.useQuery()
  const [friends, setFriends] = useState<
    friendsData | undefined
  >()
  useEffect(() => {
    if (data.data) setFriends(data.data)
  }, [data.data])

  return (
    <div className="flex flex-col text-white p-5 gap-3">
      {friends &&
        friends.friendsList.map((friend, index) => (
          <div
            key={friend?.id}
            className="w-80 h-14  bg-secondaryColor rounded-lg flex items-center">
            <Image
              className="rounded-full ml-2"
              src={friend?.imageUrl ?? ""}
              width={28}
              height={28}
              alt="ok"
            />
            <div className="relative">
              <Image
                className="absolute right-0 z-10 rounded-full border-[8px] border-tertiaryColor"
                src={`/${friend.state.toLocaleLowerCase()}.png`}
                width={16}
                height={16}
                alt="ok"
              />
            </div>
            <p className="ml-4">{friend?.pseudo}</p>
            <div className="ml-auto flex gap-2 mr-2 items-center">
              <Link
                href={`/friends/${friends.userFriendListId[index]}`}
                className="rounded-full bg-tertiaryColor border-[0.5rem] border-tertiaryColor ">
                <MessageCircle />
              </Link>
              <Button className="rounded-full">⁝</Button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default FriendsList