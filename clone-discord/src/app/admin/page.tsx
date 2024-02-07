"use client"

import { Button } from "@/components/ui/button"
import { trpc } from "../_trpc/client"

const AdminPage = () => {
  const { mutate: deleteServerAll } =
    trpc.deleteServerAll.useMutation()
  const handleClickDeleteServer = () => {
    deleteServerAll()
  }
  return (
    <div className="h-full flex justify-center items-center">
      <Button onClick={() => handleClickDeleteServer()}>
        Supprimer les serveurs
      </Button>
    </div>
  )
}

export default AdminPage
