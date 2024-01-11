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
import { useState } from "react"
import { Dialog, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"

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
    // console.log("(----------)")
    // console.log(roleId)
    // console.log(draggedRole?.role)

    {
      /*if (draggedRole) {
      const updatedRoles = roles.filter(
        (role) => role.id.toString() !== roleId
      )
      const dropZoneId = e.currentTarget.dataset.id!
      const dropZoneIndex = roles.findIndex(
        (role) => role.id.toString() === dropZoneId
      )

      const updatedRolesWithDrop = [
        ...updatedRoles.slice(0, dropZoneIndex),
        draggedRole,
        ...updatedRoles.slice(dropZoneIndex),
      ]*/
    }

    if (draggedRole) {
      const updatedRoles = [...roles]

      const draggedIndex = roles.findIndex(
        (role) => role.id === draggedRole?.id
      ) //draggedItemIndex

      const droppedId = e.currentTarget.dataset.id
      const droppedIndex = roles.findIndex(
        (role) => role.id === droppedId
      )
      const droppedRole = roles.find(
        (_, index) => index === droppedIndex
      )
      console.log(
        "------------------------------------------"
      )
      // console.log(draggedIndex)
      // console.log(draggedRole)
      // console.log(droppedIndex)
      // console.log(droppedRole)

      const rolesWithoutDragDrop = updatedRoles.filter(
        (role, index) =>
          index !== draggedIndex && index !== droppedIndex
      )
      console.log(0)
      console.log(roles)
      console.log(1)
      console.log(rolesWithoutDragDrop)
      console.log(2)

      if (draggedIndex < droppedIndex) {
        console.log(">")
        console.log(3)
        rolesWithoutDragDrop.splice(
          draggedIndex,
          0,
          droppedRole!
        )
        console.log(4)
        rolesWithoutDragDrop.splice(
          droppedIndex,
          0,
          draggedRole
        )
      } else {
        console.log("<")
        console.log(3)
        rolesWithoutDragDrop.splice(
          droppedIndex,
          0,
          draggedRole
        )
        console.log(4)
        console.log(rolesWithoutDragDrop)
        rolesWithoutDragDrop.splice(
          draggedIndex,
          0,
          droppedRole!
        )
      }
      // rolesWithoutDragDrop.splice(
      //   draggedIndex,
      //   0,
      //   droppedRole!
      // )
      console.log(5)
      console.log(rolesWithoutDragDrop)
      console.log(
        "------------------------------------------"
      )
      // Insere draggedRole à dropZoneIndex// Remove draggedTask from its previous position
      // const test1 = updatedRoles.filter(
      //   (_, index) => index !== dropZoneIndex
      // )
      // console.log(test1)
      // updatedRoles.splice(dropZoneIndex, 1)
      // test1.splice(dropZoneIndex, 1, draggedRole)
      // console.log(test1)
      // console.log(removedIndex.toString())
      // console.log(dropZoneIndex)
      // console.log(test1)

      // console.log(test2)
      // updatedRoles.splice(removedIndex, 1)

      // updatedRoles.splice(0, 1)
      setRoles(rolesWithoutDragDrop)
    }
  }

  // setRoles(updatedRolesWithDrop)
  // console.log(listRole)
  // console.log(updatedRolesWithDrop)
  //envoyer un tableau avec id associé au numéro order
  return (
    <Dialog
      open={currentServer.showModalEditRole}
      onOpenChange={currentServer.onClickEditRole}>
      <DialogContent className="sm:max-w-[425px] max-h-[90%] overflow-auto">
        <Table className="">
          <TableCaption>
            A list of your recent invoices.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                Invoice
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles &&
              roles.map((role) => (
                <TableRow
                  key={role.id}
                  data-id={role.id}
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, role.id)
                  }
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}>
                  <div>⋮⋮</div>
                  <TableCell className="font-medium">
                    {role.role}
                  </TableCell>
                  <TableCell>
                    Nombre de membre de ce role
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

export default EditRole
