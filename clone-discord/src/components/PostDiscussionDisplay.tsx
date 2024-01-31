"use client"

import { trpc } from "@/app/_trpc/client"
import {
  TEditInputChatId,
  editInputChatId,
} from "@/lib/validator/edit-input-chat"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, inputChat } from "@prisma/client"
import { format } from "date-fns"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu"
import { Input } from "./ui/input"

interface currentUsers {
  userOne: User
  userTwo: User
}

const PostDiscussionDisplay = (
  msg: inputChat,
  currentFriend: User
) => {
  const inputChatId = { id: msg.id }
  const users =
    trpc.getUsersDiscussion.useQuery(inputChatId)
  const [currentUsers, setCurrentUsers] = useState<
    currentUsers | undefined
  >()
  useEffect(() => {
    if (users.data) setCurrentUsers(users.data)
  }, [users.data])

  const getUserImage = (msg: inputChat) => {
    if (!currentUsers) return
    if (!msg.sentByUserOne) {
      return (
        <Image
          src={currentUsers?.userOne.imageUrl}
          alt="user picture"
          className="rounded-full"
          width={30}
          height={30}
        />
      )
    } else {
      return (
        <Image
          src={currentUsers.userTwo.imageUrl}
          alt="user picture"
          className="rounded-full"
          width={30}
          height={30}
        />
      )
    }
  }

  const getUser = (msg: inputChat) => {
    if (!currentUsers) return
    if (msg.sentByUserOne) {
      return currentUsers.userOne.pseudo
    }
    return
    currentUsers?.userTwo.pseudo
  }

  const [edit, setEdit] = useState(false)
  const handleClickEdit = () => {
    setEdit(true)
  }

  const { mutate: deleteMessage } =
    trpc.deleteInputChat.useMutation({})

  const handleClickDelete = (msg: inputChat) => {
    const InputChatId = { id: msg.id }
    deleteMessage(InputChatId)
  }

  const isWriter = (msg: inputChat) => {
    if (
      (msg.sentByUserOne &&
        currentFriend.id === currentUsers?.userOne.id) ||
      (msg.sentByUserTwo &&
        currentFriend.id === currentUsers?.userTwo.id)
    )
      return false
    return true
  }
  const { mutate: editInput } =
    trpc.editInputChat.useMutation({})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditInputChatId>({
    resolver: zodResolver(editInputChatId),
    defaultValues: {
      id: msg.id,
    },
  })
  const id = msg.id
  const onSubmit = ({
    messsageEdited,
    id,
  }: TEditInputChatId) => {
    editInput({ messsageEdited, id })
    setEdit(false)
  }
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex gap-4">
        <div className="">{getUserImage(msg)}</div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p>{getUser(msg)}</p>
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
          ) : !edit ? (
            <div className="flex">
              <p>{msg.message}</p>
              {msg.isEdit && (
                <p className="text-muted-foreground text-xs my-auto pl-1">
                  (modifié)
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("messsageEdited")}
                className="text-black"
                defaultValue={msg.message}
              />
            </form>
          )}
        </div>
      </ContextMenuTrigger>
      {isWriter(msg) && (
        <ContextMenuContent>
          <ContextMenuItem
            onClick={() => handleClickEdit()}>
            Modifier le message
          </ContextMenuItem>
          <ContextMenuItem>
            Ajouter une réaction
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleClickDelete(msg)}>
            Supprimer le message
          </ContextMenuItem>
        </ContextMenuContent>
      )}
    </ContextMenu>
  )
}

export default PostDiscussionDisplay
