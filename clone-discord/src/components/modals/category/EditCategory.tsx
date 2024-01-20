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
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { trpc } from "@/app/_trpc/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CategoryValidator,
  TCategoryValidator,
} from "@/lib/validator/category-validator"
import { Check } from "lucide-react"
import { toast } from "sonner"
import { ChannelGroup } from "@prisma/client"

interface editCategoryProps {
  ChannelGroup: ChannelGroup
  showModalEditCategory: boolean
  unShowModal: () => void
}

const EditCategory = (
  editCategoryProps: editCategoryProps
) => {
  const utils = trpc.useUtils()
  const { mutate } = trpc.editCategory.useMutation({
    onSuccess: () => utils.getChannelsGroups.invalidate(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategoryValidator>({
    resolver: zodResolver(CategoryValidator),
    defaultValues: {
      id: editCategoryProps.ChannelGroup.id,
      name: editCategoryProps.ChannelGroup.name,
    },
  })

  const onSubmit = ({ name, id }: TCategoryValidator) => {
    mutate({ name, id })
    editCategoryProps.unShowModal()
  }

  return (
    <Dialog
      open={editCategoryProps.showModalEditCategory}
      onOpenChange={editCategoryProps.unShowModal}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              Modifier votre catégorie
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom de la catégorie
              </Label>
              <Input
                {...register("name")}
                placeholder={
                  editCategoryProps.ChannelGroup.name
                }
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

export default EditCategory
