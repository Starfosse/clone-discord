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
import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu"
import { Input } from "./ui/input"
import InvServer from "./InvServer"

interface currentUsers {
  userOne: User
  userTwo: User
}

interface PostInputChatProps {
  msg: inputChat
  currentFriend: User
  currentUsers: currentUsers
}

const PostInputChat = ({
  msg,
  currentFriend,
  currentUsers,
}: PostInputChatProps) => {
  console.log("alo")
  const [edit, setEdit] = useState(false)
  const utils = trpc.useUtils()
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

  const { mutate: deleteMessage } =
    trpc.deleteInputChat.useMutation({
      onSuccess: () => utils.getInputChat.invalidate(),
    })
  const { mutate: editInput } =
    trpc.editInputChat.useMutation({
      onSuccess: () => utils.getInputChat.invalidate(),
    })

  const getUserImage = (msg: inputChat) => {
    if (!currentUsers) return
    if (msg.sentByUserOne) {
      return (
        <Image
          src={currentUsers?.userOne.imageUrl}
          alt="user picture"
          className="rounded-full object-cover object-center aspect-square"
          width={30}
          height={30}
        />
      )
    } else {
      return (
        <Image
          src={currentUsers.userTwo.imageUrl}
          alt="user picture"
          className="rounded-full object-cover object-center aspect-square"
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
    return currentUsers?.userTwo.pseudo
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

  const onSubmit = ({
    messsageEdited,
    id,
  }: TEditInputChatId) => {
    editInput({ messsageEdited, id })
    setEdit(false)
  }

  const handleClickEdit = () => {
    setEdit(true)
  }

  const handleClickDelete = (msg: inputChat) => {
    const InputChatId = { id: msg.id }
    deleteMessage(InputChatId)
  }
  return (
    <div className="p-1">
      {isWriter(msg) && (
        <ContextMenu>
          <ContextMenuTrigger className="flex gap-4">
            <div>{getUserImage(msg)}</div>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <p>{getUser(msg)}</p>
                <p className="text-muted-foreground text-xs">
                  {format(
                    msg.createdAt,
                    "yyyy-MM-dd HH:mm:ss"
                  )}
                </p>
              </div>
              {msg.isGif ? (
                <Image
                  src={msg.message}
                  height={200}
                  width={200}
                  alt="msg gif"
                />
              ) : msg.isInvitationServer ? (
                <InvServer serverId={msg.message} />
              ) : !edit ? (
                <div className="flex">
                  <p className="whitespace-pre-wrap break-all">
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
                    {...register("messsageEdited")}
                    className="text-black"
                    defaultValue={msg.message}
                  />
                </form>
              )}
            </div>
          </ContextMenuTrigger>
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
        </ContextMenu>
      )}
      {!isWriter(msg) && (
        <ContextMenu>
          <ContextMenuTrigger className="flex gap-4">
            <div>{getUserImage(msg)}</div>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <p>{getUser(msg)}</p>
                <p className="text-muted-foreground text-xs">
                  {format(
                    msg.createdAt,
                    "yyyy-MM-dd HH:mm:ss"
                  )}
                </p>
              </div>
              {msg.isGif ? (
                <Image
                  src={msg.message}
                  height={200}
                  width={200}
                  alt="msg gif"
                />
              ) : msg.isInvitationServer ? (
                <InvServer serverId={msg.message} />
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
          <ContextMenuContent>
            <ContextMenuItem>
              Ajouter une réaction
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      )}
    </div>
  )
}

export default PostInputChat
