"use client"

import { trpc } from "@/app/_trpc/client"
import { User } from "@prisma/client"
import { Ban, UserRoundCheck } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"

interface PendingFriendsProps {
  currentPendingFriends: User[]
}

const PendingFriends = ({
  currentPendingFriends,
}: PendingFriendsProps) => {
  const utils = trpc.useUtils()

  const { mutate: validFriendDemand } =
    trpc.validFriendDemand.useMutation({
      onSuccess: () => {
        utils.pendingInvitationFriend.invalidate()
      },
    })

  const handleClickValid = (idFriend: string) => {
    const userOneId = { id: idFriend }
    validFriendDemand(userOneId)
  }
  return (
    <div className="flex flex-col text-white p-5 gap-3">
      {currentPendingFriends.length > 0 ? (
        currentPendingFriends.map((friend) => (
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
            <p className="ml-4 overflow-ellipsis overflow-hidden whitespace-nowrap">
              {friend?.pseudo}
            </p>
            <Button
              className="ml-auto hover:bg-green-500"
              onClick={() => handleClickValid(friend!.id)}>
              <UserRoundCheck className="size-4" />
            </Button>
            <Button className="ml-2 mr-2 hover:bg-red-500">
              <Ban className="size-4" />
            </Button>
          </div>
        ))
      ) : (
        <p className="text-white text-2xl flex mx-auto justify-center items-center border-red-500">
          Aucune demande en attente
        </p>
      )}
    </div>
  )
}

export default PendingFriends
