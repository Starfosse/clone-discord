"use client"

import AddFriend from "@/components/AddFriend"
import FriendsAllList from "@/components/FriendsAllList"
import FriendsList from "@/components/FriendsAllList"
import FriendsOnlineList from "@/components/FriendsOnlineList"
import PendingFriends from "@/components/PendingFriends"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { useState } from "react"

const FriendsManagement = () => {
  const [addFriend, setAddFriend] = useState(false)
  const [seePendingFriends, setSeePendingFriends] =
    useState(false)
  const [seeOnlineFriends, setSeeOnlineFriends] =
    useState(false)
  const [seeAllFriends, setSeeAllFriends] = useState(false)
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
          className="bg-transparent hover:bg-gray-950 rounded-md p-2"
          onClick={handleClickSeePendingsFriends}>
          En Attente
        </Button>
        <Button
          className="bg-transparent hover:bg-gray-950 rounded-md p-2"
          onClick={handleClickAddFriend}>
          Ajouter
        </Button>
      </div>
      {seeAllFriends && <FriendsAllList />}
      {seeOnlineFriends && <FriendsOnlineList />}
      {addFriend && <AddFriend />}
      {seePendingFriends && <PendingFriends />}
    </div>
  )
}

export default FriendsManagement
