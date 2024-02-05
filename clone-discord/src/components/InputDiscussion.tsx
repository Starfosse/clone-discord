"use client"

import { trpc } from "@/app/_trpc/client"
import {
  TDiscussionProps,
  discussionProps,
} from "@/lib/validator/discussion-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "./ui/form"
import { Input } from "./ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import GiphySearch from "./GiphySearch"
import { useState } from "react"

interface InputChatDiscussion {
  discussionId: string
  friend: string
}

const InputChatDiscussion = ({
  discussionId,
  friend,
}: InputChatDiscussion) => {
  const utils = trpc.useUtils()
  const { mutate: addMessage } =
    trpc.addInputDiscussion.useMutation({
      onSuccess: () => utils.getInputChat.invalidate(),
    })

  const { mutate: addGif } =
    trpc.addGifDiscussion.useMutation({})
  const [selectedGif, setSelectedGif] = useState<string>("")
  const handleGifSelect = (url: string) => {
    setSelectedGif(url)
    const discussionProps = {
      discussionId: discussionId,
      gif: selectedGif,
    }
    addGif(discussionProps)
    setIsOpenGif(false)
  }
  const form = useForm<TDiscussionProps>({
    resolver: zodResolver(discussionProps),
    defaultValues: {
      message: "",
    },
  })
  const onSubmit = ({ message }: TDiscussionProps) => {
    form.reset()
    if (message === "") return
    addMessage({ discussionId, message })
    form.reset()
  }

  const [isOpenGif, setIsOpenGif] = useState(false)
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
