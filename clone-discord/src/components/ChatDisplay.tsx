"use client"

import { trpc } from "@/app/_trpc/client"
import { Channel, User } from "@prisma/client"
import { format } from "date-fns"
import Image from "next/image"
import {
  ReactEventHandler,
  ReactHTMLElement,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu"

const ChatDisplay = (cDProps: Channel) => {
  const userRef = useRef("")
  const query = trpc.getInputChannel.useInfiniteQuery(
    {
      limit: 5,
      id: cDProps.id,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  )
  const handleScroll = (event: React.UIEvent) => {}
  const ServerId = { id: cDProps.serverId }
  const listUsersMembers =
    trpc.getUsersByMemberByServer.useQuery(ServerId)
  const [currentListMembers, setCurrentListMembers] =
    useState<User[] | undefined>()
  useEffect(() => {
    if (listUsersMembers.data)
      setCurrentListMembers(listUsersMembers.data)
  }, [listUsersMembers.data])
  const getUser = (id: string) => {
    const user = currentListMembers?.find(
      (user) => user.id === id
    )
    return <p>{user?.pseudo}</p>
  }
  const getUserImage = (id: string) => {
    const user = currentListMembers?.find(
      (user) => user.id === id
    )
    if (user)
      return (
        <Image
          src={user.imageUrl}
          alt="user picture"
          className="rounded-full"
          width={30}
          height={30}
        />
      )
  }
  const isSameUser = (id: string) => {
    console.log(id)
    console.log(userRef.current)
    if (userRef.current === "" || userRef.current !== id) {
      userRef.current = id
      console.log(id, userRef.current)
      return false
    } else {
      console.log(userRef.current)
      console.log("wtf")
      return true
    }
  }
  return (
    <div
      className="text-white bg-primaryColor h-full flex relative overflow-auto"
      onScroll={handleScroll}>
      <div className="mt-auto pb-6 pl-4 flex flex-col gap-2 w-full">
        {query &&
          query.data?.pages.map((input) =>
            input.items.map((msg) => (
              <div
                className=" hover:bg-secondaryColor"
                key={msg.id}>
                <ContextMenu>
                  <ContextMenuTrigger className="flex gap-4">
                    <div className="">
                      {getUserImage(msg.userId)}{" "}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        <p>{getUser(msg.userId)}</p>
                        <p className="text-muted-foreground text-xs">
                          {format(
                            msg.createdAt,
                            "yyyy-MM-dd HH:mm:ss"
                          )}
                        </p>
                      </div>
                      <p>{msg.message}</p>
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>
                      Modifier le message
                    </ContextMenuItem>
                    <ContextMenuItem>
                      Ajouter une réaction
                    </ContextMenuItem>
                    <ContextMenuItem>
                      Supprimer le message
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>
            ))
          )}
      </div>
    </div>
  )
}

//todo : personnaliser la barre de scroll
// gérer le scrolling+ queryinfinite
//ne pas render l'image ou pseudo si même user que le msg précédennt
export default ChatDisplay
