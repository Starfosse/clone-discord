"use client"

import { trpc } from "@/app/_trpc/client"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { TMemberRoleId } from "@/lib/validator/member-role-validator"
import { useEffect, useState } from "react"
import { Button } from "../../ui/button"
import { Dialog, DialogContent } from "../../ui/dialog"
import EditRolePermission from "./EditRolePermission"
import { MemberRole } from "@prisma/client"
import { toast } from "sonner"
import { Check } from "lucide-react"

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
  const listRoleServerData =
    trpc.getRoleServer.useQuery(serverId)
  const [listRoleServer, setListRoleServer] = useState<
    MemberRole[] | undefined
  >()
  useEffect(() => {
    if (listRoleServerData.data) {
      const listRole = listRoleServerData.data.map(
        (role) => role
      )
      listRole?.sort(
        (a, b) => (a.orderServ ?? 0) - (b.orderServ ?? 0)
      )
      setListRoleServer(listRole)
    }
  }, [listRoleServerData.data])

  const { mutate: mutateOrder } =
    trpc.EditOrderMemberRole.useMutation({
      onSuccess: () => listRoleServerData.refetch(),
    })

  const { mutate: deleteRole } =
    trpc.deleteRole.useMutation({
      onSuccess: () => listRoleServerData.refetch(),
    })
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
    const draggedRole = listRoleServer?.find(
      // draggedItemObject
      (role) => role.id === roleId
    )
    if (draggedRole) {
      if (!listRoleServer) return
      const updatedRoles = [...listRoleServer]

      const draggedIndex = listRoleServer?.findIndex(
        (role) => role.id === draggedRole?.id
      )
      const droppedId = e.currentTarget.dataset.id
      const droppedIndex = listRoleServer?.findIndex(
        (role) => role.id === droppedId
      )
      const droppedRole = listRoleServer?.find(
        (_, index) => index === droppedIndex
      )
      const rolesWithoutDragDrop = updatedRoles.filter(
        (role, index) =>
          index !== draggedIndex && index !== droppedIndex
      )
      if (
        draggedIndex &&
        droppedIndex &&
        draggedIndex < droppedIndex
      ) {
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
      } else if (
        draggedIndex &&
        droppedIndex &&
        draggedIndex > droppedIndex
      ) {
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
      setListRoleServer(rolesWithoutDragDrop)
    }
  }

  const handleClick = (id: string) => {
    const roleToEdit = listRoleServer?.filter(
      (role) => role.id === id
    )
    setMemberRole(roleToEdit![0])
    setShowModalEditRole(true)
  }

  const handleClickX = (id: string) => {
    const roleToDelete = listRoleServer?.filter(
      (role) => role.id === id
    )
    if (!roleToDelete) return
    const memberRoleId = { id: roleToDelete[0].id }
    deleteRole(memberRoleId)
  }

  const handleClickValidate = () => {
    const memberRoles = listRoleServer
    memberRoles?.map(
      (role, index) => (role.orderServ = index)
    ) //@ts-ignore
    mutateOrder(memberRoles)
    currentServer.onClickEditRole()
  }

  return (
    <Dialog
      open={currentServer.showModalEditRole}
      onOpenChange={currentServer.onClickEditRole}>
      <DialogContent className="sm:max-w-[475px] max-h-[90%] overflow-auto">
        <Table className="mt-6">
          <TableBody className="">
            {listRoleServer &&
              listRoleServer.map((role) => (
                <TableRow
                  key={role.id}
                  className=" flex items-center text-lg">
                  <div
                    data-id={role.id}
                    key={role.id}
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
                  <TableCell className="font-medium justify-end ml-auto flex flex-row gap-4">
                    <Button
                      onClick={() => handleClick(role.id)}>
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleClickX(role.id)}>
                      X
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Button
          onClick={() => {
            handleClickValidate()
            toast.success(
              <div className="flex items-center">
                <Check />
                &nbsp;L'ordre des rôles a bien été
                enregistré
              </div>,
              { duration: 3000 }
            )
          }}>
          Valider l'ordre
        </Button>
      </DialogContent>
      {showModalEditRole && (
        <EditRolePermission
          serverId={currentServer.id}
          MemberRole={MemberRole!}
          showModalEditRole={showModalEditRole}
          onClickShowModalEditRole={
            onClickShowModalEditRole
          }
          refetch={listRoleServerData.refetch}
        />
      )}
    </Dialog>
  )
}
//TODO: supprimer role
export default EditRole
