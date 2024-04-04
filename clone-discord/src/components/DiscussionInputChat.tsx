"use client"

import { trpc } from "@/app/_trpc/client"
import { useIntersection } from "@mantine/hooks"
import { User } from "@prisma/client"
import {
  ElementRef,
  useEffect,
  useRef,
  useState,
} from "react"
import PostInputChat from "./PostInputChat"
import { useChatQuery } from "@/hooks/use-chat-query"
import { useChatSocket } from "@/hooks/use-chat-socket"
import { useChatScroll } from "@/hooks/use-chat-scroll"
import { useSocket } from "./socket-provider"

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
  // const bottomRef = useRef<HTMLDivElement>(null)
  // const lastPostRef = useRef<HTMLElement>(null)
  const [currentUsers, setCurrentUsers] = useState<
    currentUsers | undefined
  >()

  const { socket } = useSocket()
  type Message = any
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    socket.on("chat message", (message: any) => {
      console.log(message)
      setMessages((prevMessages) => [
        ...prevMessages,
        message,
      ])
    })

    // Nettoyage de l'écouteur lors du démontage du composant
    return () => {
      socket.off("chat message")
    }
  }, [socket]) // Assurez-vous de placer le socket dans les dépendances pour que l'effet soit réexécuté si le socket change

  useEffect(() => {
    console.log(messages)
  }, [messages])
  // const {
  //   data: query,
  //   fetchNextPage,
  //   isFetchingNextPage,
  //   hasNextPage,
  // } = trpc.getInputChat.useInfiniteQuery(
  //   {
  //     discussionId: discussionId,
  //   },
  //   {
  //     getNextPageParam: (lastPage) => lastPage.nextCursor,
  //   }
  // )
  const addKey = `chat:${discussionId}:messages`
  const updateKey = `chat:${discussionId}:messages:update`
  const chatRef = useRef<ElementRef<"div">>(null)
  const bottomRef = useRef<ElementRef<"div">>(null)

  const {
    data: query,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useChatQuery({ discussionId })
  useChatSocket({
    queryKey: discussionId,
    addKey,
    updateKey,
  })
  const inputChatId = { id: discussionId }

  const users =
    trpc.getUsersDiscussion.useQuery(inputChatId)

  const posts = query?.pages.flatMap((page) => page.items)
  console.log(posts)
  // const { ref, entry } = useIntersection({
  //   root: lastPostRef.current,
  //   threshold: 1,
  // })

  // useEffect(() => {
  //   if (bottomRef.current)
  //     bottomRef.current.scrollIntoView({
  //       behavior: "smooth",
  //     })
  // }, [])
  // useEffect(() => {
  //   if (entry?.isIntersecting) fetchNextPage()
  // }, [entry, fetchNextPage])
  // useEffect(() => {
  //   if (users.data) setCurrentUsers(users.data)
  // }, [users.data, fetchNextPage])

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: query?.pages?.[0]?.items?.length ?? 0,
  })
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
                  // ref={ref}
                >
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
