"use client"

import { format } from "date-fns"
import { trpc } from "@/app/_trpc/client"
import {
  Member,
  MemberRole,
  Role,
  Server,
  User,
} from "@prisma/client"
import Image from "next/image"
import { useEffect, useState } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
}

interface DataDisplay {
  role: Role
  member: Member[]
}
const getDataDisplay = (id: string): DataDisplay[] => {
  const ServerId = { id: id }
  const ServerListMemberData =
    trpc.getMemberByRole.useQuery(ServerId)
  const [currentListMember, setCurrentListMember] =
    useState<Server | undefined>()
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
  const DataDisplay: DataDisplay[] = []
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
  const dataDisplay: DataDisplay[] = getDataDisplay(
    currentServer.id
  )
  // getDataDisplay(currentServer.id)

  return (
    <div className="pl-4 pt-4 relative right-2">
      {dataDisplay &&
        dataDisplay.map((data) => (
          <div key={data.role.id}>
            <div className="text-muted-foreground pl-2 pb-2">
              {data.role.role} - {data.member.length}
            </div>
            <div>
              {data.member.map((m) => (
                <div className="">
                  <AvatarMember
                    member={m}
                    currentServer={currentServer}
                  />{" "}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

interface AvatarMemberProps {
  member: Member
  currentServer: ServerRightListMember
}
const AvatarMember = (
  AvatarMemberProps: AvatarMemberProps
) => {
  const MemberId = { id: AvatarMemberProps.member.userId }
  const memberData = trpc.getUserByMember.useQuery(MemberId)
  const [currentMember, setCurrentMember] = useState<
    User | undefined
  >()
  const [currentListRoles, setCurrentListRoles] = useState<
    Role[] | undefined
  >()
  const memberId = { id: AvatarMemberProps.member.id }
  const listRoleData =
    trpc.getListRoleByMember.useQuery(memberId)
  useEffect(() => {
    if (memberData.data) setCurrentMember(memberData.data)
    if (listRoleData.data)
      setCurrentListRoles(listRoleData.data)
  }, [memberData.data, listRoleData.data])

  const stateUser = currentMember?.state.toLocaleLowerCase()
  const [open, setOpen] = useState(false)
  const setOpenTrue = () => {
    setOpen(true)
  }
  const setOpenFalse = () => {
    setOpen(false)
  }
  console.log(currentListRoles)
  return (
    <div
      onClick={() => setOpen(!open)}
      className="flex relative items-center p-1 hover:cursor-pointer hover:bg-neutral-700 hover:rounded-sm h-full w-full">
      {currentMember && (
        <Image
          className="absolute top-8 left-8 z-10 rounded-full border-[3px] border-tertiaryColor"
          src={`/${stateUser}.png`}
          width={16}
          height={16}
          alt="ok"
        />
      )}
      {currentMember && (
        <Avatar className="">
          <AvatarImage src={currentMember?.imageUrl} />
          <AvatarFallback className="text-xs">
            {currentMember?.pseudo}
          </AvatarFallback>
        </Avatar>
      )}
      {currentMember && (
        <div className="pl-2">{currentMember?.pseudo}</div>
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
                  className="absolute top-12 left-12  z-10 rounded-full border-[3px] border-tertiaryColor"
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
                  className="rounded-full aspect-square border-[3px] border-tertiaryColor"
                />
              </div>
              <div className="bg-zinc-900 rounded-md p-2">
                <p className="text-gray-200 text-2xl">
                  {currentMember.pseudo}
                </p>
                <Separator className="w-11/12 mx-auto my-2  " />
                <p className="text-gray-200 font-bold text-xs py-2">
                  MEMBRE DEPUIS
                </p>
                <div className="flex mt-[-1rem]">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={"/logo-discord.png"}
                      width={14}
                      height={14}
                      alt="logo-discord"
                      className="aspect-square rounded-full m-1 object-contain"
                    />
                    <p className="relative right-1">
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
                      className="aspect-square rounded-full m-1 object-contain"
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
                  <div className="flex pt-1">
                    {currentListRoles.map((role) => (
                      <div
                        key={role.id}
                        className="bg-secondaryColor text-sm rounded-md px-1 flex-shrink-0">
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
