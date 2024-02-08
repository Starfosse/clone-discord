"use client"

import { trpc } from "@/app/_trpc/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { User } from "@prisma/client"
import { Check } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface aMProps {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  userId: string
  createdAt: Date
  updatedAt: Date
  showModalAddMember: boolean
  onClickAddMember: () => void
}

interface friendsData {
  friendsList: User[]
  userFriendListId: string[]
}

const AddMember = (currentServer: aMProps) => {
  const [
    currentListUserFriends,
    setCurrentListUserFriends,
  ] = useState<friendsData | undefined>()

  const listUserFriendsData =
    trpc.getUserListUserFriends.useQuery()

  useEffect(() => {
    if (listUserFriendsData.data)
      setCurrentListUserFriends(listUserFriendsData.data)
  }, [listUserFriendsData.data])

  const { mutate: invServer } =
    trpc.sendInvitationServer.useMutation({
      onSuccess: () => {
        toast.success(
          <div className="flex items-center">
            <Check />
            &nbsp;L&apos;invitation au serveur a bien été
            envoyé
          </div>,
          { duration: 3000 }
        )
      },
    })

  const handleClickInvServer = (index: number) => {
    if (!currentListUserFriends) return
    const invitationServer = {
      serverId: currentServer.id,
      userFriendId:
        currentListUserFriends.userFriendListId[index],
    }
    invServer(invitationServer)
  }
  return (
    <div className="">
      <Dialog
        open={currentServer.showModalAddMember}
        onOpenChange={currentServer.onClickAddMember}>
        <DialogContent className="flex-col">
          <DialogHeader className="">
            <DialogTitle className=" w-[350px]">
              Invite des amis sur{" "}
              <p className="truncate">
                {currentServer.name}
              </p>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {currentListUserFriends && (
            <ScrollArea className="h-72 w-72 rounded-md border mx-auto">
              <div className="p-4">
                <h4 className="mb-4 text-sm  leading-none font-bold">
                  Amis
                </h4>
                {currentListUserFriends.friendsList.map(
                  (friend, index) => (
                    <>
                      <div
                        key={friend.id}
                        className="text-sm flex items-center">
                        <Image
                          src={friend.imageUrl}
                          alt="friend picture"
                          className="rounded-full aspect-square mr-2 object-cover object-center"
                          width={24}
                          height={24}
                        />
                        {friend.pseudo}
                        <button
                          onClick={() =>
                            handleClickInvServer(index)
                          }
                          className="ml-auto border p-1 border-green-300 rounded-sm px-2">
                          Inviter
                        </button>
                      </div>
                      <Separator className="my-2" />
                    </>
                  )
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddMember
