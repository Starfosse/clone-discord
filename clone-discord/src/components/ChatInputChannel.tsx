"use client"

import { trpc } from "@/app/_trpc/client"
import { Channel, User } from "@prisma/client"
import { useEffect, useRef, useState } from "react"
import PostDisplay from "./PostInputChannel"
import { useInfiniteQuery } from "react-query"
import { useIntersection } from "@mantine/hooks"
import PostInputChannel from "./PostInputChannel"

const ChatInputChannel = (cDProps: Channel) => {
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

  const whoData = trpc.getUser.useQuery()
  const [currentWho, setCurrentWho] = useState<
    User | undefined
  >()

  const ServerId = { id: cDProps.serverId }
  const listUsersMembers =
    trpc.getUsersByMemberByServer.useQuery(ServerId)
  const [currentListMembers, setCurrentListMembers] =
    useState<User[] | undefined>()
  useEffect(() => {
    if (listUsersMembers.data)
      setCurrentListMembers(listUsersMembers.data)
    if (whoData.data) setCurrentWho(whoData.data)
  }, [listUsersMembers.data, whoData.data])

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
    <div className="text-white bg-primaryColor h-full flex relative">
      <div className="mt-auto pb-6 pl-4 flex flex-col gap-4 w-full">
        {query &&
          posts &&
          currentWho &&
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
                    currentWho={currentWho}
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
                  currentWho={currentWho}
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
export default ChatInputChannel
