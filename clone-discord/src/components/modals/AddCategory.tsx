"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { trpc } from "@/app/_trpc/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CategoryValidator,
  TCategoryValidator,
} from "@/lib/validator/category-validator"
import { Check } from "lucide-react"
import { toast } from "sonner"

interface Server {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  userId: string
  createdAt: Date
  updatedAt: Date
  showModalCreateCategory: boolean
  onClickCreateCategory: () => void
}

const AddCategory = (currentServer: Server) => {
  const { mutate } = trpc.createcategory.useMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategoryValidator>({
    resolver: zodResolver(CategoryValidator),
    defaultValues: {
      id: currentServer.id,
      name: "",
    },
  })

  const onSubmit = ({ name, id }: TCategoryValidator) => {
    mutate({ name, id })
    currentServer.onClickCreateCategory()
  }

  return (
    <Dialog
      open={currentServer.showModalCreateCategory}
      onOpenChange={currentServer.onClickCreateCategory}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Créer votre catégorie</DialogTitle>
            <DialogDescription>
              Vous pourrez tout modifier plus tard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom de la catégorie
              </Label>
              <Input
                {...register("name")}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() =>
                toast.success(
                  <div className="flex items-center">
                    <Check />
                    &nbsp;Vos modifications ont été
                    enregristrées
                  </div>,
                  { duration: 3000 }
                )
              }>
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategory