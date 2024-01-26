"use client"

import { Channel } from "@prisma/client"
import { Input } from "./ui/input"
import { trpc } from "@/app/_trpc/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "./ui/form"
import { Button } from "./ui/button"
import {
  TInputContent,
  inputContent,
} from "@/lib/validator/input-content-validator"
import { useRef, useState } from "react"
import GiphySearch from "./GiphySearch"

const InputChannel = (currentChannel: Channel) => {
  const utils = trpc.useUtils()
  const [selectedGif, setSelectedGif] = useState<string>("")
  const handleGifSelect = (url: string) => {
    setSelectedGif(url)
    console.log(selectedGif)
  }
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
    const id = currentChannel.id
    addMessage({ id, message })
    form.reset()
  }
  return (
    <div className="bg-primaryColor h-14 w-full">
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
                    className="relative bottom-1 w-[98%] mx-auto bg-secondaryColor border border-secondaryColor"
                  />
                </FormControl>
                <div className="text-xs">
                  <Button className="flex relative bottom-14 ml-auto p-[-4] text-xs pt-[-4]">
                    GIF
                  </Button>
                </div>
                <div className="relative bottom-40 text-black">
                  <GiphySearch
                    onGifSelect={handleGifSelect}
                  />
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default InputChannel
//todo retirer la couleur en bg au profit de celle pour le chat, retirer ler border blanc quand focus
//gérer l'envoie du gif dans le formulaire pour l'intégrer dans les input
