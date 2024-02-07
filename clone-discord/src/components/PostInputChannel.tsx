"use client"

import { trpc } from "@/app/_trpc/client"
import { User } from "@prisma/client"
import { format } from "date-fns"
import Image from "next/image"
import { useState } from "react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu"

import {
  TInputChannelValidator,
  inputChannelValidator,
} from "@/lib/validator/edit-input-channel-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputChannel } from "@prisma/client"
import { useForm } from "react-hook-form"
import { Input } from "./ui/input"

interface PostInputChannelProps {
  msg: InputChannel
  currentListMembers: User[]
  currentWho: User
}
const PostInputChannel = ({
  msg,
  currentListMembers,
  currentWho,
}: PostInputChannelProps) => {
  const getUser = (id: string) => {
    const user = currentListMembers.find(
      (user) => user.id === id
    )
    return <p>{user?.pseudo}</p>
  }
  const getUserImage = (id: string) => {
    const user = currentListMembers.find(
      (user) => user.id === id
    )
    if (user)
      return (
        <Image
          src={user.imageUrl}
          alt="user picture"
          className="rounded-full aspect-square"
          width={30}
          height={30}
        />
      )
  }
  const utils = trpc.useUtils()
  const { mutate: deleteMessage } =
    trpc.deleteInputChannel.useMutation({
      onSuccess: () => {
        utils.getInputChannel.invalidate()
      },
    })

  const handleClickDelete = (inputId: string) => {
    const InputChannelId = { id: inputId }
    deleteMessage(InputChannelId)
  }
  const [edit, setEdit] = useState(false)
  const handleClickEdit = (inputId: string) => {
    setEdit(true)
  }
  const { mutate: editInput } =
    trpc.editInputChannel.useMutation({
      onSuccess: () => utils.getInputChannel.invalidate(),
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputChannelValidator>({
    resolver: zodResolver(inputChannelValidator),
    defaultValues: {
      id: msg.id,
      message: msg.message,
    },
  })
  const onSubmit = ({
    message,
    id,
  }: TInputChannelValidator) => {
    editInput({ message, id })
    setEdit(false)
  }
  {
    currentWho.id === msg.userId
  }
  return currentWho.id === msg.userId ? (
    <ContextMenu>
      <ContextMenuTrigger className="flex gap-4 items-center pr-2">
        <div className="flex-shrink-0">
          {getUserImage(msg.userId)}
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center ">
            <p>{getUser(msg.userId)}</p>
            <p className="text-muted-foreground text-xs">
              {format(msg.createdAt, "yyyy-MM-dd HH:mm:ss")}
            </p>
          </div>
          {msg.isGif ? (
            <Image
              className=""
              src={msg.message}
              height={200}
              width={200}
              alt="msg gif"
            />
          ) : !edit ? (
            <div className="flex overflow-hidden whitespace-pre-wrap break-all">
              <p className="overflow-hidden">
                {msg.message}
              </p>
              {msg.isEdit && (
                <p className="text-muted-foreground text-xs my-auto pl-1">
                  (modifié)
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("message")}
                className="text-black"
                defaultValue={msg.message}
              />
            </form>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => handleClickEdit(msg.id)}>
          Modifier le message
        </ContextMenuItem>
        <ContextMenuItem>
          Ajouter une réaction
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => handleClickDelete(msg.id)}>
          Supprimer le message
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ) : (
    <ContextMenu>
      <ContextMenuTrigger className="flex gap-4 items-center pr-2">
        <div className="">{getUserImage(msg.userId)}</div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p>{getUser(msg.userId)}</p>
            <p className="text-muted-foreground text-xs">
              {format(msg.createdAt, "yyyy-MM-dd HH:mm:ss")}
            </p>
          </div>
          {msg.isGif ? (
            <Image
              src={msg.message}
              height={200}
              width={200}
              alt="msg gif"
            />
          ) : (
            <div className="flex overflow-hidden whitespace-pre-wrap break-all">
              <p className="overflow-hidden">
                {msg.message}
              </p>
              {msg.isEdit && (
                <p className="text-muted-foreground text-xs my-auto pl-1">
                  (modifié)
                </p>
              )}
            </div>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Ajouter une réaction
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default PostInputChannel
