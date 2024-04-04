"use client"

import { trpc } from "@/app/_trpc/client"
import {
  TDiscussionProps,
  discussionProps,
} from "@/lib/validator/discussion-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import GiphySearch from "./GiphySearch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "./ui/form"
import { Input } from "./ui/input"
import qs from "query-string"
import axios from "axios"
import { useRouter } from "next/navigation"
import { router } from "@/server/trpc"
import { useSocket } from "./socket-provider"

interface InputChatDiscussion {
  discussionId: string
  friend: string
}

const InputChatDiscussion = ({
  discussionId,
  friend,
}: InputChatDiscussion) => {
  const [isOpenGif, setIsOpenGif] = useState(false)
  const [selectedGif, setSelectedGif] = useState<string>("")
  const utils = trpc.useUtils()
  const form = useForm<TDiscussionProps>({
    resolver: zodResolver(discussionProps),
    defaultValues: {
      message: "",
    },
  })

  const { mutate: addMessage } =
    trpc.addInputDiscussion.useMutation({
      onSuccess: () => utils.getInputChat.invalidate(),
    })
  const { mutate: addGif } =
    trpc.addGifDiscussion.useMutation({
      onSuccess: () => utils.getInputChat.invalidate(),
    })
  const { socket } = useSocket()
  // const router = useRouter()
  const onSubmit = async ({
    message,
  }: TDiscussionProps) => {
    form.reset()
    console.log("test")
    if (message === "") return
    const query = { discussionId: discussionId }
    const url = qs.stringifyUrl({
      url: "/api/socket/message-user",
      query,
    })
    console.log(url)
    await axios.post(url, { message })
    socket.on("chat message", (message: any) => {
      console.log(message)
    })
    console.log("test")
    // addMessage({ discussionId, message })
    form.reset()
    // router.refresh()
  }

  const handleGifSelect = (url: string) => {
    setSelectedGif(url)
    const discussionProps = {
      discussionId: discussionId,
      gif: selectedGif,
    }
    addGif(discussionProps)
    setIsOpenGif(false)
  }

  return (
    <div className="bg-primaryColor h-14 overflow-hidden">
      <div className=" w-[98%] mx-auto bg-secondaryColor rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`Envoyez un message à @${friend}`}
                      className="relative w-full h-full bg-secondaryColor border-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="flex w-[98%] relative flex-row gap-2">
        <div className="text-xs text-black justify-end ml-auto relative bottom-[1.9rem]">
          <DropdownMenu
            open={isOpenGif}
            onOpenChange={() => setIsOpenGif(!isOpenGif)}>
            <DropdownMenuTrigger>
              <div className=" bg-gray-400 p-1 rounded-sm">
                GIF
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-56 text-muted-foreground border-black bg-secondaryColor h-[400px]  overflow-x-hidden relative right-16 bottom-2">
              <GiphySearch onGifSelect={handleGifSelect} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default InputChatDiscussion
