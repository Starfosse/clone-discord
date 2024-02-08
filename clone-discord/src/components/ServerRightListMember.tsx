"use client"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { trpc } from "@/app/_trpc/client"
import permissions from "@/lib/interface/permissions"
import { Member, Role, Server, User } from "@prisma/client"
import { format } from "date-fns"
import Image from "next/image"
import { useEffect, useState } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Separator } from "./ui/separator"

interface ServerRightListMember {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  userId: string
  createdAt: Date
  updatedAt: Date
  listPermissions: permissions
}

interface DataDisplay {
  role: Role
  member: Member[]
}

interface AvatarMemberProps {
  member: Member
  currentServer: ServerRightListMember
  listPermissions: permissions
}

const GetDataDisplay = (id: string): DataDisplay[] => {
  const ServerId = { id: id }
  const DataDisplay: DataDisplay[] = []
  const [currentListMember, setCurrentListMember] =
    useState<Server | undefined>()

  const ServerListMemberData =
    trpc.getMemberByRole.useQuery(ServerId)

  useEffect(() => {
    if (ServerListMemberData.data)
      setCurrentListMember(ServerListMemberData.data)
  }, [ServerListMemberData.data])
  const roles = ServerListMemberData.data
    ? ServerListMemberData.data.roles.sort(
        (a: Role, b: Role) =>
          (a.orderServ ?? 0) - (b.orderServ ?? 0)
      )
    : undefined

  const members = ServerListMemberData.data
    ? ServerListMemberData.data!.members
    : undefined

  if (currentListMember && members && roles) {
    for (let i = 0; i < roles.length; i++) {
      const role: Role = roles[i]
      const memberList: Member[] = []
      for (let j = 0; j < members.length; j++) {
        const isMemberExist = DataDisplay.some((data) =>
          data.member.some((m) => m.id === members[j].id)
        )
        if (
          members[j].role.find(
            (r) => r.RoleId === roles[i].id
          ) &&
          members[j] &&
          !isMemberExist
        ) {
          memberList.push(members[j])
          break
        }
      }
      DataDisplay.push({ role, member: memberList })
    }
  }
  for (let i = 0; i < DataDisplay.length; i++) {
    if (!DataDisplay[i].member.length) {
      DataDisplay.splice(i, 1)
      i -= 1
    }
  }
  return DataDisplay
}

const ServerRightListMember = (
  currentServer: ServerRightListMember
) => {
  const dataDisplay: DataDisplay[] = GetDataDisplay(
    currentServer.id
  )

  return (
    <div className="pl-4 pt-4 relative right-2">
      {dataDisplay &&
        dataDisplay.map((data) => (
          <div key={data.role.id}>
            <div className="text-muted-foreground pl-2 pb-2">
              <p className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                {" "}
                {data.role.role} - {data.member.length}
              </p>
            </div>
            <div>
              {data.member.map((m) => (
                <div key={m.id} className="">
                  <AvatarMember
                    member={m}
                    currentServer={currentServer}
                    listPermissions={
                      currentServer.listPermissions
                    }
                  />{" "}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

const AvatarMember = (
  AvatarMemberProps: AvatarMemberProps
) => {
  const MemberId = { id: AvatarMemberProps.member.userId }
  const memberId = { id: AvatarMemberProps.member.id }
  const [open, setOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState<
    User | undefined
  >()
  const [currentListRoles, setCurrentListRoles] = useState<
    Role[] | undefined
  >()

  const memberData = trpc.getUserByMember.useQuery(MemberId)
  const listRoleData =
    trpc.getListRoleByMember.useQuery(memberId)

  useEffect(() => {
    if (memberData.data) setCurrentMember(memberData.data)
    if (listRoleData.data)
      setCurrentListRoles(listRoleData.data)
  }, [memberData.data, listRoleData.data])

  const stateUser = currentMember?.state.toLocaleLowerCase()

  const setOpenTrue = () => {
    setOpen(true)
  }
  const setOpenFalse = () => {
    setOpen(false)
  }

  const { mutate: expelMember } =
    trpc.expelMember.useMutation()

  const handleDeleteMember = (id: string) => {
    const MemberId = { id: id }
    expelMember(MemberId)
  }
  return (
    <div
      onClick={() => setOpen(!open)}
      className="flex relative items-center p-1 hover:cursor-pointer hover:bg-neutral-700 hover:rounded-sm h-full w-full">
      {currentMember &&
      AvatarMemberProps.listPermissions.expel_Member ? (
        <div className="w-full">
          <ContextMenu>
            <ContextMenuTrigger className="w-full">
              <div className="flex relative items-center w-full">
                <Image
                  className="absolute top-7 left-7 z-10 object-cover object-center rounded-full border-[3px] border-tertiaryColor"
                  src={`/${stateUser}.png`}
                  width={16}
                  height={16}
                  alt="ok"
                />
                <Avatar className="">
                  <AvatarImage
                    src={currentMember?.imageUrl}
                  />
                  <AvatarFallback className="text-xs">
                    {currentMember?.pseudo}
                  </AvatarFallback>
                </Avatar>
                <div className="pl-2 overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {currentMember?.pseudo}
                </div>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem
                onClick={() =>
                  handleDeleteMember(currentMember.id)
                }
                className="text-red-600 hover:text-red-600 ">
                Expulser le membre
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex relative items-center w-full">
            <Image
              className="absolute top-7 left-7 z-10 object-cover object-center rounded-full border-[3px] border-tertiaryColor"
              src={`/${stateUser}.png`}
              width={16}
              height={16}
              alt="ok"
            />
            <Avatar className="">
              <AvatarImage src={currentMember?.imageUrl} />
              <AvatarFallback className="text-xs">
                {currentMember?.pseudo}
              </AvatarFallback>
            </Avatar>
            <div className="pl-2 overflow-ellipsis overflow-hidden whitespace-nowrap">
              {currentMember?.pseudo}
            </div>
          </div>
        </div>
      )}
      {currentMember && currentListRoles && (
        <div
          className="relative rounded-md"
          onClick={() => setOpen(!open)}>
          <DropdownMenu
            open={open}
            onOpenChange={() => setOpenFalse()}>
            <DropdownMenuTrigger className="invisible"></DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-72 bg-secondaryColor border-none text-white z-50 h-full relative right-48 top-6 p-2"
              side="left">
              <div className="relative pl-2  mb-4">
                <Image
                  className="absolute top-12 left-12  z-10 rounded-full object-cover object-center border-[3px] border-tertiaryColor"
                  src={`/${stateUser}.png`}
                  width={18}
                  height={18}
                  alt="ok"
                />
                <Image
                  src={currentMember?.imageUrl}
                  height={64}
                  width={64}
                  alt="member picture"
                  className="rounded-full object-cover object-center aspect-square border-[3px] border-tertiaryColor"
                />
              </div>
              <div className="bg-zinc-900 rounded-md p-2">
                <p className="text-gray-200 text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {currentMember.pseudo}
                </p>
                <Separator className="w-11/12 mx-auto my-2  " />
                <p className="text-gray-200 font-bold text-xs py-2 ">
                  MEMBRE DEPUIS
                </p>
                <div className="flex mt-[-1rem]">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={"/logo-discord.png"}
                      width={14}
                      height={14}
                      alt="logo-discord"
                      className="aspect-square rounded-full object-cover object-center m-1"
                    />
                    <p className="relative right-1 py-2">
                      {format(
                        currentMember.createdAt,
                        "dd-MM-yyyy"
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Image
                      src={
                        AvatarMemberProps.currentServer
                          .imageUrl
                      }
                      width={14}
                      height={14}
                      alt="logo-serv"
                      className="aspect-square rounded-full object-cover object-center m-1 "
                    />
                    <p className="relative right-1">
                      {format(
                        AvatarMemberProps.member.createdAt,
                        "dd-MM-yyyy"
                      )}
                    </p>
                  </div>
                </div>
                {currentListRoles &&
                currentListRoles.length === 1 ? (
                  <p className="font-bold">Rôle</p>
                ) : (
                  <p className="font-bold">Rôles</p>
                )}
                {currentListRoles && (
                  <div className="flex gap-1 pt-1">
                    {currentListRoles.map((role) => (
                      <div
                        key={role.id}
                        className="bg-secondaryColor text-sm rounded-md px-1 flex-shrink-0 overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {role.role}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  )
}

export default ServerRightListMember
{
  /*DropdownMenuContent en absolute ?
  /* open={open} onOpenChange={setOpenFalse} */
  //trigger sans aschild qui permet la visibilité
}
