"use client"

import { trpc } from "@/app/_trpc/client"
import AddFriend from "@/components/AddFriend"
import FriendsAllList from "@/components/FriendsAllList"
import FriendsList from "@/components/FriendsAllList"
import FriendsOnlineList from "@/components/FriendsOnlineList"
import PendingFriends from "@/components/PendingFriends"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { User } from "@prisma/client"
import { Users } from "lucide-react"
import { useEffect, useState } from "react"

const FriendsManagement = () => {
  const [addFriend, setAddFriend] = useState(false)
  const [seePendingFriends, setSeePendingFriends] =
    useState(false)
  const [seeOnlineFriends, setSeeOnlineFriends] =
    useState(false)
  const [seeAllFriends, setSeeAllFriends] = useState(false)
  const [currentWho, setCurrentWho] = useState<
    User | undefined
  >()

  const [currentPendingFriends, setCurrentPendingFriends] =
    useState<User[] | undefined>()

  const whoData = trpc.getUser.useQuery()
  const pendingFriendsData =
    trpc.pendingInvitationFriend.useQuery()

  useEffect(() => {
    if (pendingFriendsData.data)
      setCurrentPendingFriends(pendingFriendsData.data)
    if (whoData.data) setCurrentWho(whoData.data)
  }, [pendingFriendsData.data, whoData.data])

  const handleClickSeeOnlineFriends = () => {
    setSeeOnlineFriends(true)
    setSeeAllFriends(false)
    setSeePendingFriends(false)
    setAddFriend(false)
  }
  const handleClickSeeAllFriends = () => {
    setSeeAllFriends(true)
    setSeeOnlineFriends(false)
    setSeePendingFriends(false)
    setAddFriend(false)
  }
  const handleClickSeePendingsFriends = () => {
    setSeePendingFriends(true)
    setSeeOnlineFriends(false)
    setSeeAllFriends(false)
    setAddFriend(false)
  }
  const handleClickAddFriend = () => {
    setAddFriend(true)
    setSeePendingFriends(false)
    setSeeOnlineFriends(false)
    setSeeAllFriends(false)
  }
  return (
    <div className="text-white bg-primaryColor h-full">
      <div className="flex gap-4 p-4 text-lg items-center">
        <div className="flex">
          <Users />
          <p className="pl-4">Amis</p>
        </div>
        <Button
          className="bg-transparent hover:bg-gray-950 rounded-md p-2"
          onClick={handleClickSeeOnlineFriends}>
          En ligne
        </Button>
        <Button
          className="bg-transparent hover:bg-gray-950 rounded-md p-2"
          onClick={handleClickSeeAllFriends}>
          Tous
        </Button>
        <Button
          className="bg-transparent hover:bg-gray-950 rounded-md p-2 relative"
          onClick={handleClickSeePendingsFriends}>
          <div
            className={cn(
              "absolute left-16 bottom-6 bg-red-500 rounded-full aspect-square invisible",
              {
                "px-2, visible":
                  currentPendingFriends &&
                  currentPendingFriends?.length > 0,
              }
            )}>
            {currentPendingFriends?.length}
          </div>
          En Attente
        </Button>
        <Button
          className="bg-transparent hover:bg-gray-950 rounded-md p-2 "
          onClick={handleClickAddFriend}>
          Ajouter
          {/* {currentPendingFriends?.length} */}
        </Button>
      </div>
      {seeAllFriends && currentWho && (
        <FriendsAllList {...currentWho} />
      )}
      {seeOnlineFriends && currentWho && (
        <FriendsOnlineList {...currentWho} />
      )}
      {addFriend && currentWho && (
        <AddFriend {...currentWho} />
      )}
      {seePendingFriends && currentPendingFriends && (
        <PendingFriends
          currentPendingFriends={currentPendingFriends}
        />
      )}
    </div>
  )
}

export default FriendsManagement
