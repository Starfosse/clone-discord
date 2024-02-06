"use client"

import { trpc } from "@/app/_trpc/client"
import { useIntersection } from "@mantine/hooks"
import { User } from "@prisma/client"
import { useEffect, useRef, useState } from "react"
import PostInputChat from "./PostInputChat"

interface DiscussionInputChatProps {
  discussionId: string
  currentFriend: User
}

interface currentUsers {
  userOne: User
  userTwo: User
}

const DiscussionInputChat = ({
  discussionId,
  currentFriend,
}: DiscussionInputChatProps) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const lastPostRef = useRef<HTMLElement>(null)
  const [currentUsers, setCurrentUsers] = useState<
    currentUsers | undefined
  >()

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
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  )
  const inputChatId = { id: discussionId }

  const users =
    trpc.getUsersDiscussion.useQuery(inputChatId)

  const posts = query?.pages.flatMap((page) => page.items)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
      })
  }, [])
  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry])
  useEffect(() => {
    if (users.data) setCurrentUsers(users.data)
  }, [users.data])

  return (
    <div className="text-white bg-primaryColor h-full flex relative overflow-auto">
      <div className="mt-auto pb-6 pl-4 flex flex-col gap-4 w-full">
        {query &&
          currentUsers &&
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
                    currentUsers={currentUsers}
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
                  currentUsers={currentUsers}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default DiscussionInputChat
