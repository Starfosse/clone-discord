"use client"

import { trpc } from "@/app/_trpc/client"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Role } from "@prisma/client"
import { Check } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "../../ui/button"
import { Dialog, DialogContent } from "../../ui/dialog"
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
  const [MemberRole, setMemberRole] = useState<Role>()
  const [showModalEditRole, setShowModalEditRole] =
    useState(false)
  const [listRoleServer, setListRoleServer] = useState<
    Role[] | undefined
  >()

  const listRoleServerData =
    trpc.getRoleServer.useQuery(serverId)

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
      onSuccess: () => {
        listRoleServerData.refetch(),
          toast.success(
            <div className="flex items-center">
              <Check />
              &nbsp;L'ordre des rôles a bien été enregistré
            </div>,
            { duration: 3000 }
          )
      },
    })
  const { mutate: deleteRole } =
    trpc.deleteRole.useMutation({
      onSuccess: () => {
        listRoleServerData.refetch()
        toast.success(
          <div className="flex items-center">
            <Check />
            &nbsp;Le rôle a bien été supprimé
          </div>,
          { duration: 3000 }
        )
      },
    })

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
      <DialogContent className="max-w-[475px] max-h-[90%] ">
        <Table className="mt-6 ">
          <TableBody className="">
            {listRoleServer &&
              listRoleServer.map((role) => (
                <TableRow
                  key={role.id}
                  className=" flex items-center text-lg ">
                  <div
                    data-id={role.id}
                    key={role.id}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, role.id)
                    }
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="py-2 px-2 hover:cursor-pointer">
                    ⋮⋮
                  </div>
                  <TableCell className="font-medium  ">
                    <p className="truncate w-[185px]">
                      {" "}
                      {role.role}
                    </p>
                  </TableCell>
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
export default EditRole
