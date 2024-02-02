"use client"

import { trpc } from "@/app/_trpc/client"
import {
  TInputContent,
  inputContent,
} from "@/lib/validator/input-content-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Channel } from "@prisma/client"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "./ui/form"
import { Input } from "./ui/input"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import GiphySearch from "./GiphySearch"
import EmojipediaSearch from "./EmojipediaSearch"

const InputChannel = (currentChannel: Channel) => {
  const utils = trpc.useUtils()
  const [selectedGif, setSelectedGif] = useState<string>("")
  const handleGifSelect = (url: string) => {
    setSelectedGif(url)
    const channelId = {
      id: currentChannel.id,
      gif: selectedGif,
    }
    addGif(channelId)
  }

  const { mutate: addGif } =
    trpc.addGifInputChannel.useMutation({
      onSuccess: () => utils.getInputChannel.invalidate(),
    })
  const { mutate: addMessage } =
    trpc.addInputChannel.useMutation({
      onSuccess: () => utils.getInputChannel.invalidate(),
    })
  const form = useForm<TInputContent>({
    resolver: zodResolver(inputContent),
    defaultValues: {
      id: currentChannel.id,
      message: "",
    },
  })
  const onSubmit = ({ message }: TInputContent) => {
    if (message === "") return
    const id = currentChannel.id
    addMessage({ id, message })
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
                      placeholder={`Envoyez un message dans ${currentChannel?.name}`}
                      className="relative w-full h-full  bg-secondaryColor border-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
        <div className="text-xs text-black relative bottom-[1.9rem]">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className=" bg-gray-400 p-1 rounded-sm">
                :
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-muted-foreground border-black bg-secondaryColor h-[400px]  overflow-x-hidden relative right-16 bottom-2">
              t
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default InputChannel
