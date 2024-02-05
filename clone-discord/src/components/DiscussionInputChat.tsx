"use client"

import { trpc } from "@/app/_trpc/client"
import { useIntersection } from "@mantine/hooks"
import { useEffect, useRef } from "react"
import PostDiscussionDisplay from "./PostInputChat"
import { User } from "@prisma/client"
import PostInputChat from "./PostInputChat"

interface DiscussionInputChatProps {
  discussionId: string
  currentFriend: User
}

const DiscussionInputChat = ({
  discussionId,
  currentFriend,
}: DiscussionInputChatProps) => {
  const {
    data: query,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = trpc.getInputChat.useInfiniteQuery(
    {
      discussionId: discussionId,
    },
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.nextCursor,
    }
  )
  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry])

  const posts = query?.pages.flatMap((page) => page.items)

  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
      })
  }, [])
  return (
    <div className="text-white bg-primaryColor h-full flex relative overflow-auto">
      <div className="mt-auto pb-6 pl-4 flex flex-col gap-4 w-full">
        {query &&
          posts &&
          posts.map((post, i) => {
            if (i === posts.length - 1) {
              return (
                <div
                  key={post.id}
                  className="hover:bg-secondaryColor"
                  ref={ref}>
                  <PostInputChat
                    msg={post}
                    currentFriend={currentFriend}
                  />
                  <div ref={bottomRef} />
                </div>
              )
            }
            return (
              <div
                key={post.id}
                className="hover:bg-secondaryColor">
                <PostInputChat
                  msg={post}
                  currentFriend={currentFriend}
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

export default DiscussionInputChat
