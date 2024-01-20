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
import { Switch } from "@/components/ui/switch"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Check } from "lucide-react"

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

interface memberRoleIdLabel {
  id: string
  label: string
  value: boolean
}

const AccordionMember = ({
  member,
  roles,
  currentServer,
}: AccordionMemberProps) => {
  const ServerId = { serverId: currentServer.id }
  const MemberId = { id: member.id }
  const memberData = trpc.getUserByMember.useQuery(MemberId)
  const memberRolesData =
    trpc.getRolesOfMember.useQuery(MemberId)
  const rolesServerData =
    trpc.getRoleServer.useQuery(ServerId)
  const [currentMember, setCurrentMember] = useState<
    User | undefined
  >()
  const [currentServerRoles, setCurrentServerRoles] =
    useState<memberRoleIdLabel[] | undefined>()
  useEffect(() => {
    if (memberData.data) {
      setCurrentMember(memberData.data)
    }
    if (rolesServerData.data && memberRolesData.data) {
      const memberRoleIdLabel: memberRoleIdLabel[] =
        rolesServerData.data.map((role) => ({
          id: role.id,
          label: role.role,
          value: memberRolesData.data.some((requiredRole) =>
            requiredRole.id.includes(role.id)
          ),
        }))
      setCurrentServerRoles(memberRoleIdLabel)
    }
  }, [
    memberData.data,
    memberRolesData.data,
    rolesServerData.data,
  ])

  const updateMemberRoleValue = (roleId: string): void => {
    const updatedRoles = currentServerRoles?.map(
      (role, index) =>
        role.id === roleId
          ? { ...role, value: !role.value }
          : role
    )
    setCurrentServerRoles(updatedRoles)
  }

  const utils = trpc.useUtils()
  const { mutate: giveMemberRoles } =
    trpc.giveMemberRoles.useMutation({
      onSuccess: () => utils.getRolesOfMember.invalidate(),
    })

  const handleClickSubmit = () => {
    const id = member.id
    const RoleId =
      currentServerRoles
        ?.filter((role) => role.value === true)
        ?.map((role) => role.id) ?? []
    if (RoleId) giveMemberRoles({ id, RoleId })
  }
  return (
    <div>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {currentMember?.pseudo}
        </AccordionTrigger>
        <AccordionContent>
          {currentServerRoles &&
            roles.map((role, index) => (
              <div
                key={role.id}
                className="flex justify-between">
                {role.role}
                <Switch
                  defaultChecked={
                    currentServerRoles[index].value
                  }
                  onCheckedChange={() => {
                    updateMemberRoleValue(role.id)
                  }}
                />
              </div>
            ))}
          <Button type="submit" onClick={handleClickSubmit}>
            Enregistrer
          </Button>
        </AccordionContent>
      </AccordionItem>
    </div>
  )
}

export default AddMemberRole
