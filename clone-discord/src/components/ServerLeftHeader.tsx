"use client"
// @refresh reset
import { trpc } from "@/app/_trpc/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Server {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  userId: string
  createdAt: Date
  updatedAt: Date
  refetch: () => Promise<any>
}

import {
  ArrowBigDown,
  FileDiff,
  LogOut,
  MessageCirclePlus,
  Pencil,
  PlusCircle,
  Settings,
  Trash2,
  UserPlus,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import AddCategory from "./modals/AddCategory"
import AddChannel from "./modals/AddChannel"
import CreateRole from "./modals/CreateRole"
import EditRole from "./modals/EditRole"
import EditServer from "./modals/EditServer"

const ServerLeftHeader = (currentServer: Server) => {
  const serverId = { id: currentServer.id }
  const [
    showModalCreateCategory,
    setshowModalCreateCategory,
  ] = useState(false)

  const [
    showModalCreateChannel,
    setshowModalCreateChannel,
  ] = useState(false)

  const [showModalEditServer, setshowModalEditServer] =
    useState(false)

  const [showModalCreateRole, setshowModalCreateRole] =
    useState(false)

  const [showModalEditRole, setshowModalEditRole] =
    useState(false)

  const router = useRouter()

  const { mutate: deleteServer } =
    trpc.deleteServer.useMutation()

  const onSelectDeleteServer = () => {
    deleteServer(serverId)
    router.refresh()
    router.push("/")
  }

  const { mutate: quitServer } =
    trpc.quitServer.useMutation()

  const onSelectQuitServer = () => {
    quitServer(serverId)
    router.refresh()
    router.push("/")
  }

  const onSelectShowEditServer = () => {
    setshowModalEditServer(true)
  }

  const onClickEditServer = () => {
    setshowModalEditServer(false)
  }

  const onSelectCreateCategory = () => {
    setshowModalCreateCategory(true)
  }
  const onClickCreateCategory = () => {
    setshowModalCreateCategory(false)
  }

  const onSelectCreateChannel = () => {
    setshowModalCreateChannel(true)
  }
  const onClickCreateChannel = () => {
    setshowModalCreateChannel(false)
  }

  const onSelectCreateRole = () => {
    setshowModalCreateRole(true)
  }
  const onClickCreateRole = () => {
    setshowModalCreateRole(false)
  }

  const onSelectEditRole = () => {
    setshowModalEditRole(true)
  }
  const onClickEditRole = () => {
    setshowModalEditRole(false)
  }

  return (
    <>
      {/* <div className="flex w-full items-center text-white cursor-pointer hover:bg-gray-600 px-2 py-2 pb-4">
        <p>{currentServer.name}</p>
        <ArrowBigDown className="justify-end ml-auto" />
      </div> */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex w-full items-center text-white cursor-pointer hover:bg-gray-600 px-2 py-2 pb-4">
            <p>{currentServer.name}</p>
            <ArrowBigDown className="justify-end ml-auto" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-muted-foreground bg-tertiaryColor">
          <DropdownMenuItem>
            Inviter des gens (WIP)
            <DropdownMenuShortcut>
              <UserPlus className="size-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={onSelectShowEditServer}>
            Modifier le profil du serveur{" "}
            <DropdownMenuShortcut>
              <Settings className="size-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onSelectCreateRole}>
            Créér des rôles
            <DropdownMenuShortcut>
              <PlusCircle className="size-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onSelectEditRole}>
            Modifier des rôles
            <DropdownMenuShortcut>
              <PlusCircle className="size-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Attribuer des rôles
            <DropdownMenuShortcut>
              <Pencil className="size-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={onSelectCreateCategory}>
            Créér une catégorie
            <DropdownMenuShortcut>
              <FileDiff className="size-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={onSelectCreateChannel}>
            Créér un salon
            <DropdownMenuShortcut>
              <MessageCirclePlus className="size-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onSelectDeleteServer}>
            Supprimer le serveur
            <DropdownMenuShortcut>
              <Trash2 className="size-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onSelectQuitServer}>
            Quitter le serveur
            <DropdownMenuShortcut>
              <LogOut className="size-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showModalCreateCategory && (
        <AddCategory
          {...currentServer}
          showModalCreateCategory={showModalCreateCategory}
          onClickCreateCategory={onClickCreateCategory}
        />
      )}
      {showModalCreateChannel && (
        <AddChannel
          {...currentServer}
          showModalCreateChannel={showModalCreateChannel}
          onClickCreateChannel={onClickCreateChannel}
        />
      )}
      {showModalEditServer && (
        <EditServer
          {...currentServer}
          onClickEditServer={onClickEditServer}
          showModalEditServer={showModalEditServer}
          refetch={currentServer.refetch}
        />
      )}
      {showModalCreateRole && (
        <CreateRole
          {...currentServer}
          onClickCreateRole={onClickCreateRole}
          showModalCreateRole={showModalCreateRole}
        />
      )}
      {showModalEditRole && (
        <EditRole
          {...currentServer}
          onClickEditRole={onClickEditRole}
          showModalEditRole={showModalEditRole}
        />
      )}
    </>
  )
}

export default ServerLeftHeader

//ajouter alert dialog pour quitter/supprimer le server
