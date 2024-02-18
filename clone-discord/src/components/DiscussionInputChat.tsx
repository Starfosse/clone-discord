"use client"

import { trpc } from "@/app/_trpc/client"
import { useIntersection } from "@mantine/hooks"
import { User, inputChat } from "@prisma/client"
import { useEffect, useRef, useState } from "react"
import PostInputChat from "./PostInputChat"
import { useSocket } from "@/lib/socket-provider"

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
  const [messages, setMessages] = useState<inputChat[]>([])
  const { socket } = useSocket()
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

  let posts = query?.pages.flatMap((page) => page.items)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  useEffect(() => {
    socket.on("chat message", (message: inputChat) => {
      console.log(message)

      if (!message) return
      setMessages((prevMessages) => [
        ...prevMessages,
        message,
      ])
    })
    return () => {
      socket.off("chat message")
    }
  }, [socket])
  useEffect(() => {
    console.log(messages)
  }, [messages])
  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
      })
  }, [])
  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry, fetchNextPage])
  useEffect(() => {
    if (users.data) setCurrentUsers(users.data)
  }, [users.data, fetchNextPage])
  if (!posts) return
  return (
    <div className="text-white bg-primaryColor h-full flex relative overflow-auto">
      <div className="mt-auto pb-6 pl-4 flex flex-col gap-4 w-full">
        {query &&
          currentUsers &&
          posts &&
          posts.map((post, i) => {
            if (i === posts!.length - 1) {
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
        {messages &&
          currentUsers &&
          posts &&
          messages.map((post, i) => {
            if (i === posts!.length - 1) {
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
                  {/* <div ref={bottomRef} /> */}
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
