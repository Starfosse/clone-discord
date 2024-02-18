"use client"

import { trpc } from "@/app/_trpc/client"
import DiscussionInputChat from "@/components/DiscussionInputChat"
import FriendHeader from "@/components/FriendHeader"
import InputChatDiscussion from "@/components/InputDiscussion"
import { User } from "@prisma/client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const FriendPage = () => {
  const userFriend = useParams<{ friendId: string }>()
  const userFriendId = {
    userFriendId: userFriend!.friendId,
  }
  const [currentFriend, setCurrentFriend] = useState<
    User | undefined
  >()

  const friend =
    trpc.getFriendDiscussion.useQuery(userFriendId)

  useEffect(() => {
    if (friend.data) setCurrentFriend(friend.data)
  }, [friend.data])

  const { mutate: shownMessage } =
    trpc.editMessageShownBypage.useMutation()

  const handleClickShownMessage = () => {
    shownMessage(userFriendId)
  }
  return (
    <div
      className="h-full"
      onClick={handleClickShownMessage}>
      {currentFriend && (
        <div className="text-white flex flex-col bg-primaryColor h-full">
          <FriendHeader currentFriend={currentFriend} />

          <DiscussionInputChat
            discussionId={userFriend!.friendId}
            currentFriend={currentFriend}
          />

          <div className="mt-auto sticky">
            <InputChatDiscussion
              discussionId={userFriend!.friendId}
              friend={currentFriend?.pseudo}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default FriendPage
