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
  const { mutate: addMessage } =
    trpc.addInputChannel.useMutation()
  const form = useForm<TInputContent>({
    resolver: zodResolver(inputContent),
    defaultValues: {
      id: currentChannel.id,
      message: "",
    },
  })
  const onSubmit = ({ message }: TInputContent) => {
    console.log("good")
    const id = currentChannel.id
    addMessage({ id, message })
    form.reset()
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
