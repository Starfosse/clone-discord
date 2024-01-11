"use client"

import { trpc } from "@/app/_trpc/client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MemberRole } from "@prisma/client"
import { ReactEventHandler, useState } from "react"
import { Dialog, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"
import EditRolePermission from "./EditRolePermission"

interface Server {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  userId: string
  createdAt: Date
  updatedAt: Date
  showModalEditRole: boolean
  onClickEditRole: () => void
}

const EditRole = (currentServer: Server) => {
  const serverId = { serverId: currentServer.id }
  const { data: listRoleServer, isLoading } =
    trpc.getRoleServer.useQuery(serverId)
  const listRole = listRoleServer?.memberRoles.map(
    (role) => role
  )
  const [roles, setRoles] = useState<MemberRole[]>(
    listRole!
  )
  const [MemberRole, setMemberRole] = useState<MemberRole>()

  const [showModalEditRole, setShowModalEditRole] =
    useState(false)

  const onClickShowModalEditRole = () => {
    setShowModalEditRole(false)
  }
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: string
  ) => {
    e.dataTransfer.setData("roleId", id)
  }

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault()
  }

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault()
    const roleId = e.dataTransfer.getData("roleId")
    const draggedRole = roles.find(
      // draggedItemObject
      (role) => role.id === roleId
    )
    if (draggedRole) {
      const updatedRoles = [...roles]

      const draggedIndex = roles.findIndex(
        (role) => role.id === draggedRole?.id
      )
      const droppedId = e.currentTarget.dataset.id
      const droppedIndex = roles.findIndex(
        (role) => role.id === droppedId
      )
      const droppedRole = roles.find(
        (_, index) => index === droppedIndex
      )
      const rolesWithoutDragDrop = updatedRoles.filter(
        (role, index) =>
          index !== draggedIndex && index !== droppedIndex
      )
      if (draggedIndex < droppedIndex) {
        rolesWithoutDragDrop.splice(
          draggedIndex,
          0,
          droppedRole!
        )
        rolesWithoutDragDrop.splice(
          droppedIndex,
          0,
          draggedRole
        )
      } else if (draggedIndex > droppedIndex) {
        rolesWithoutDragDrop.splice(
          droppedIndex,
          0,
          draggedRole
        )
        rolesWithoutDragDrop.splice(
          draggedIndex,
          0,
          droppedRole!
        )
      } else return
      setRoles(rolesWithoutDragDrop)
    }
  }

  const handleClick = (id: string) => {
    const roleToEdit = roles.filter(
      (role) => role.id === id
    )
    setMemberRole(roleToEdit[0])
    setShowModalEditRole(true)
  }
  return (
    <Dialog
      open={currentServer.showModalEditRole}
      onOpenChange={currentServer.onClickEditRole}>
      <DialogContent className="sm:max-w-[425px] max-h-[90%] overflow-auto">
        <Table className="mt-6">
          <TableBody className="">
            {roles &&
              roles.map((role) => (
                <TableRow
                  key={role.id}
                  className=" flex items-center text-lg">
                  <div
                    data-id={role.id}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, role.id)
                    }
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="py-2 px-4 hover:cursor-pointer">
                    ⋮⋮
                  </div>
                  <TableCell className="font-medium">
                    {role.role}
                  </TableCell>
                  {/* <TableCell>
                    Nombre de membre de ce role
                  </TableCell> */}
                  <TableCell className="font-medium justify-end ml-auto">
                    <Button
                      onClick={() => handleClick(role.id)}>
                      Modifier
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </DialogContent>
      {showModalEditRole && (
        <EditRolePermission
          MemberRole={MemberRole}
          showModalEditRole={showModalEditRole}
          onClickShowModalEditRole={
            onClickShowModalEditRole
          }
        />
      )}
    </Dialog>
  )
}

export default EditRole
