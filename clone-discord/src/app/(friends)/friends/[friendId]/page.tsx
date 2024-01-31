"use client"

import { trpc } from "@/app/_trpc/client"
import ChatDiscussion from "@/components/ChatDiscussion"
import FriendHeader from "@/components/FriendHeader"
import InputDiscussion from "@/components/InputDiscussion"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { User } from "@prisma/client"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const FriendPage = () => {
  const userFriend = useParams<{ friendId: string }>()
  const userFriendId = { userFriendId: userFriend.friendId }
  const friend =
    trpc.getFriendDiscussion.useQuery(userFriendId)
  const [currentFriend, setCurrentFriend] = useState<
    User | undefined
  >()
  useEffect(() => {
    if (friend.data) setCurrentFriend(friend.data)
  }, [friend.data])
  return (
    <div className="text-white flex flex-col bg-primaryColor h-full">
      {currentFriend && <FriendHeader {...currentFriend} />}
      test
      {currentFriend && (
        <ChatDiscussion
          discussionId={userFriend.friendId}
          currentFriend={currentFriend}
        />
      )}
      <div className="mt-auto sticky">
        {currentFriend && (
          <InputDiscussion
            discussionId={userFriend.friendId}
            friend={currentFriend?.pseudo}
          />
        )}
      </div>
    </div>
  )
}

export default FriendPage
