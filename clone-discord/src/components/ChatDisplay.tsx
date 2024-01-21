"use client"

import { trpc } from "@/app/_trpc/client"
import { Channel } from "@prisma/client"
import { format } from "date-fns"
import {
  ReactEventHandler,
  useEffect,
  useState,
} from "react"

const ChatDisplay = (cDProps: Channel) => {
  const query = trpc.getInputChannel.useInfiniteQuery(
    {
      limit: 15,
      id: cDProps.id,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    }
  )
  console.log(query.data)
  const handleScroll = (event) => {
    console.log("it works !")
    query.fetchNextPage()
  }
  return (
    <div
      className="text-white bg-primaryColor h-full flex relative overflow-auto"
      onScroll={handleScroll}>
      <div
        className="mt-auto pb-6 pl-4 flex flex-col gap-2 w-full"
        // style={{ overflowY: "scroll" }}
      >
        {query &&
          query.data?.pages.map((input) =>
            input.items.map((msg) => (
              <div className="shrink-1 " key={msg.id}>
                <p>
                  {format(
                    msg.createdAt,
                    "yyyy-MM-dd HH:mm:ss"
                  )}
                </p>
                <p>{msg.message}</p>
              </div>
            ))
          )}
      </div>
    </div>
  )
}

//todo : personnaliser la barre de scroll
export default ChatDisplay
