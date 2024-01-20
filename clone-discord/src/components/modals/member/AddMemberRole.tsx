"use client"

import { trpc } from "@/app/_trpc/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Member, Role, Server, User } from "@prisma/client"
import { useEffect, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface aMRProps {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  userId: string
  createdAt: Date
  updatedAt: Date
  showModalAddMemberRole: boolean
  onClickAddMemberRole: () => void
}

const AddMemberRole = (currentServer: aMRProps) => {
  const ServerId = { id: currentServer.id }
  const listMemberRoleData =
    trpc.getMemberByRole.useQuery(ServerId)
  const [currentMembers, setCurrentMembers] = useState<
    Member[] | undefined
  >()
  const [currentRoles, setCurrentRoles] = useState<
    Role[] | undefined
  >()
  useEffect(() => {
    if (listMemberRoleData.data) {
      setCurrentMembers(listMemberRoleData.data.members)
      setCurrentRoles(listMemberRoleData.data.roles)
    }
  }, [listMemberRoleData.data])
  console.log(currentRoles)
  return (
    <Dialog
      open={currentServer.showModalAddMemberRole}
      onOpenChange={currentServer.onClickAddMemberRole}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Attribuez des rôles aux membres
          </DialogTitle>
          <DialogDescription>
            Choisissez le membre en question puis
            sélectionnez les rôles souhaités
          </DialogDescription>
        </DialogHeader>
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full">
            {currentMembers &&
              currentRoles &&
              currentMembers.map((member) => (
                <div key={member.id}>
                  <AccordionMember
                    member={member}
                    roles={currentRoles}
                    currentServer={currentServer}
                  />
                </div>
              ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  )
}
interface AccordionMemberProps {
  member: Member
  roles: Role[]
  currentServer: aMRProps
}

const AccordionMember = ({
  member,
  roles,
  currentServer,
}: AccordionMemberProps) => {
  const ServerId = { serverId: currentServer.id }
  const MemberId = { id: member.userId }
  const memberData = trpc.getUserByMember.useQuery(MemberId)
  const memberRolesData =
    trpc.getRolesOfMember.useQuery(MemberId)
  const rolesServerData =
    trpc.getRoleServer.useQuery(ServerId)
  const [currentMember, setCurrentMember] = useState<
    User | undefined
  >()
  const [currentMemberRoles, setCurrentMemberRoles] =
    useState<Role[] | undefined>()
  const [currentServerRoles, setCurrentServerRoles] =
    useState<Role[] | undefined>()
  useEffect(() => {
    if (memberData.data) setCurrentMember(memberData.data)
    if (memberRolesData.data)
      setCurrentMemberRoles(memberRolesData.data)
    if (rolesServerData.data)
      setCurrentServerRoles(rolesServerData.data)
  }, [
    memberData.data,
    memberRolesData.data,
    rolesServerData.data,
  ])

  return (
    <div>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {currentMember?.pseudo}
        </AccordionTrigger>
        <AccordionContent>
          {roles.map((role) => (
            <div key={role.id}>{role.role}</div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </div>
  )
}

export default AddMemberRole
