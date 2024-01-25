"use client"

import { trpc } from "@/app/_trpc/client"
import { Channel, User } from "@prisma/client"
import { useEffect, useState } from "react"
import PostDisplay from "./PostDisplay"

const ChatDisplay = (cDProps: Channel) => {
  const utils = trpc.useUtils()
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
  return (
    <div
      className="text-white bg-primaryColor h-full flex relative overflow-auto"
      onScroll={handleScroll}>
      <div className="mt-auto pb-6 pl-4 flex flex-col gap-2 w-full">
        {query.data &&
          currentListMembers &&
          query.data?.pages.map((input) =>
            input.items.map((msg) => (
              <div
                className="hover:bg-secondaryColor"
                key={msg.id}>
                <PostDisplay
                  msg={msg}
                  currentListMembers={currentListMembers}
                />
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
// gérer le modifier le message qui ne modifie que l'input concerné
export default ChatDisplay
