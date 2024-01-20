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

const InputChannel = (currentChannel: Channel) => {
  const champInputRef = useRef(null)
  const { mutate: addMessage } =
    trpc.addInputChannel.useMutation()
  const form = useForm<TInputContent>({
    resolver: zodResolver(inputContent),
    defaultValues: {
      id: currentChannel.id,
      message: "",
    },
  })
  const [refresh, setRefresh] = useState(false)
  const onSubmit = ({ message }: TInputContent) => {
    if (!champInputRef.current) return
    if (!!champInputRef.current.value) return
    champInputRef.current.value = ""
    setRefresh(!refresh)
    console.log("good")
    const id = currentChannel.id
    addMessage({ id, message })
  }
  return (
    <div className="bg-tertiaryColor h-14 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    ref={champInputRef}
                    {...field}
                    placeholder={`Envoyez un message dans ${currentChannel?.name}`}
                    className="relative bottom-1 w-[98%] mx-auto bg-secondaryColor border border-secondaryColor"
                  />
                </FormControl>
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
