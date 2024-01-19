"use client"
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

interface ServerListMemberProps {
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
        (a, b) => (a.orderServ ?? 0) - (b.orderServ ?? 0)
      )
    : undefined

  const members = ServerListMemberData.data
    ? ServerListMemberData.data!.members
    : undefined
  const DataDisplay: DataDisplay[] = []
  if (ServerListMemberData.data && members && roles) {
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

const ServerListMember = (
  currentServer: ServerListMemberProps
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
                  <AvatarMember {...m} />{" "}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

const AvatarMember = (member: Member) => {
  const MemberId = { id: member.userId }
  const memberData = trpc.getUserByMember.useQuery(MemberId)
  const [currentMember, setCurrentMember] = useState<
    User | undefined
  >()

  useEffect(() => {
    if (memberData.data) setCurrentMember(memberData.data)
  }, [memberData.data])
  const stateUser = currentMember?.state.toLocaleLowerCase()
  const [open, setOpen] = useState(false)
  const setOpenTrue = () => {
    setOpen(true)
  }
  const setOpenFalse = () => {
    setOpen(false)
  }

  return (
    <div
      onClick={setOpenTrue}
      className="flex relative items-center p-1 hover:cursor-pointer hover:bg-neutral-700 hover:rounded-sm">
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
      {/* <Dialog open={open} onOpenChange={setOpenFalse}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save
              when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4"></div>
            <div className="grid grid-cols-4 items-center gap-4"></div>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  )
}

export default ServerListMember
