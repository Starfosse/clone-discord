"use client"

import { trpc } from "@/app/_trpc/client"
import { Channel, User } from "@prisma/client"
import { useEffect, useRef, useState } from "react"
import PostDisplay from "./PostInputChannel"
import { useInfiniteQuery } from "react-query"
import { useIntersection } from "@mantine/hooks"
import PostInputChannel from "./PostInputChannel"

const ChatInputChannel = (cDProps: Channel) => {
  // const utils = trpc.useUtils()
  // const query = trpc.getInputChannel.useInfiniteQuery(
  //   {
  //     limit: 10,
  //     id: cDProps.id,
  //   },
  //   {
  //     getNextPageParam: (lastPage) => lastPage.nextCursor,
  //   }
  // )
  const {
    data: query,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = trpc.getInputChannel.useInfiniteQuery(
    {
      channelId: cDProps.id,
    },
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.nextCursor,
    }
  )

  // const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
  //   'id: cDProps.id',
  //   ({ pageParam = 0 }) => trpc.getInputChannel.useQuery([cDProps.id, 5, pageParam] ),
  //   {
  //     getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
  //   }
  // );

  // const handleScroll = (event: React.UIEvent) => {}
  const ServerId = { id: cDProps.serverId }
  const listUsersMembers =
    trpc.getUsersByMemberByServer.useQuery(ServerId)
  const [currentListMembers, setCurrentListMembers] =
    useState<User[] | undefined>()
  useEffect(() => {
    if (listUsersMembers.data)
      setCurrentListMembers(listUsersMembers.data)
  }, [listUsersMembers.data])

  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry])

  const posts = query?.pages.flatMap((page) => page.items)
  return (
    <div className="text-white bg-primaryColor h-full flex relative overflow-auto">
      <div className="mt-auto pb-6 pl-4 flex flex-col gap-4 w-full">
        {query &&
          posts &&
          currentListMembers &&
          posts.map((post, i) => {
            if (i === posts.length - 1) {
              return (
                <div
                  key={post.id}
                  className="hover:bg-secondaryColor"
                  ref={ref}>
                  <PostInputChannel
                    msg={post}
                    currentListMembers={currentListMembers}
                  />
                </div>
              )
            }
            return (
              <div
                key={post.id}
                className="hover:bg-secondaryColor">
                <PostInputChannel
                  msg={post}
                  currentListMembers={currentListMembers}
                />
              </div>
            )
          })}
        {/* {query && (
          <button onClick={() => fetchNextPage()}>
            Load More
          </button>
        )} */}
      </div>
    </div>
  )
}

//todo : personnaliser la barre de scroll
// gérer le scrolling+ queryinfinite
//ne pas render l'image ou pseudo si même user que le msg précédennt
// gérer le modifier le message qui ne modifie que l'input concerné
export default ChatInputChannel
