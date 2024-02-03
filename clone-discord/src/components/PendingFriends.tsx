"use client"

import { trpc } from "@/app/_trpc/client"
import { Button } from "./ui/button"
import { Ban } from "lucide-react"
import { UserRoundCheck } from "lucide-react"
import Image from "next/image"

const PendingFriends = () => {
  const utils = trpc.useUtils()
  const data = trpc.pendingInvitationFriend.useQuery()
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
      {data.data &&
        data.data.map((friend) => (
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
        ))}
    </div>
  )
}

export default PendingFriends
