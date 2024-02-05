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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Server {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  userId: string
  createdAt: Date
  updatedAt: Date
  refetch: () => Promise<any>
  listPermissions: permissions
}

import {
  ArrowBigDown,
  ArrowLeft,
  ChevronDown,
  FileDiff,
  LogOut,
  MessageCirclePlus,
  Pencil,
  PlusCircle,
  Settings,
  Trash2,
  UserPlus,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import AddCategory from "./modals/category/AddCategory"
import AddChannel from "./modals/channel/AddChannel"
import CreateRole from "./modals/role/CreateRole"
import EditRole from "./modals/role/EditRole"
import EditServer from "./modals/server/EditServer"
import AddMemberRole from "./modals/member/AddMemberRole"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import permissions from "@/lib/interface/permissions"

const ServerLeftHeader = (currentServer: Server) => {
  const serverId = { id: currentServer.id }
  const utils = trpc.useUtils()
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

  const [
    showModalAddMemberRole,
    setShowModalAddMemberRole,
  ] = useState(false)

  const router = useRouter()

  const { mutate: deleteServer } =
    trpc.deleteServer.useMutation({
      onSuccess: () => utils.getUserListServ.invalidate(),
    })

  const onSelectDeleteServer = () => {
    deleteServer(serverId)
    router.refresh()
    router.push("/")
  }

  const { mutate: quitServer } =
    trpc.quitServer.useMutation({
      onSuccess: () => utils.getUserListServ.invalidate(),
    })

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

  const onSelectAddMemberRole = () => {
    setShowModalAddMemberRole(true)
  }
  const onClickAddMemberRole = () => {
    setShowModalAddMemberRole(false)
  }

  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <DropdownMenu
        open={showModal}
        onOpenChange={() => setShowModal(false)}>
        <DropdownMenuTrigger>
          <div
            onClick={() => setShowModal(true)}
            className="transition-all flex w-full items-center text-white cursor-pointer hover:bg-gray-600 px-2 py-2 pb-4">
            <p className="overflow-ellipsis overflow-hidden whitespace-nowrap px-1">
              {currentServer.name}
            </p>
            <ChevronDown
              className={cn(" ml-auto flex-shrink-0", {
                hidden: showModal,
              })}
            />
            <X
              className={cn(" hidden  ml-auto ", {
                inline: showModal,
              })}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-muted-foreground bg-tertiaryColor">
          {currentServer.listPermissions.invite_Member && (
            <DropdownMenuItem>
              Inviter des gens (WIP)
              <DropdownMenuShortcut>
                <UserPlus className="size-5" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          {currentServer.listPermissions.edit_Server && (
            <DropdownMenuItem
              onSelect={onSelectShowEditServer}>
              Modifier le profil du serveur{" "}
              <DropdownMenuShortcut>
                <Settings className="size-5" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          {currentServer.listPermissions
            .role_Management && (
            <DropdownMenuItem onSelect={onSelectCreateRole}>
              Créér des rôles
              <DropdownMenuShortcut>
                <PlusCircle className="size-5" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          {currentServer.listPermissions
            .role_Management && (
            <DropdownMenuItem onSelect={onSelectEditRole}>
              Modifier des rôles
              <DropdownMenuShortcut>
                <PlusCircle className="size-5" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          {currentServer.listPermissions
            .role_Management && (
            <DropdownMenuItem
              onSelect={onSelectAddMemberRole}>
              Attribuer des rôles
              <DropdownMenuShortcut>
                <Pencil className="size-5" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onSelect={onSelectCreateCategory}>
            Créér une catégorie
            <DropdownMenuShortcut>
              <FileDiff className="size-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          {currentServer.listPermissions
            .create_Remove_Channel && (
            <DropdownMenuItem
              onSelect={onSelectCreateChannel}>
              Créér un channel
              <DropdownMenuShortcut>
                <MessageCirclePlus className="size-5" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          {currentServer.listPermissions.edit_Server && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className=" hover:bg-slate-50 relative flex justify-between w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <p>Supprimer le serveur</p>{" "}
                  <Trash2 className="size-5" />
                </button>
              </AlertDialogTrigger>
              <DropdownMenuShortcut></DropdownMenuShortcut>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    En êtes vous sûr ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible, cela
                    supprimera le serveur ainsi que les
                    données liées au serveur.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onSelectDeleteServer}>
                    Continuer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className=" hover:bg-slate-50 relative flex justify-between w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <p>Quitter le serveur</p>{" "}
                <LogOut className="size-5" />
              </button>
            </AlertDialogTrigger>
            {/* Supprimer le serveur */}
            <DropdownMenuShortcut></DropdownMenuShortcut>
            {/* </DropdownMenuItem> */}
            {/* </AlertDialogTrigger> */}
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  En êtes vous sûr ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible, cela
                  supprimera le serveur ainsi que les
                  données liées au serveur.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Annuler
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onSelectQuitServer}>
                  Continuer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
          refetch={currentServer.refetch}
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
      {showModalAddMemberRole && (
        <AddMemberRole
          {...currentServer}
          onClickAddMemberRole={onClickAddMemberRole}
          showModalAddMemberRole={showModalAddMemberRole}
        />
      )}
    </>
  )
}

export default ServerLeftHeader

//ajouter alert dialog pour quitter/supprimer le server
