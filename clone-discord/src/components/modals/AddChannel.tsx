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
  ChannelValidator,
  TChannelValidator,
} from "@/lib/validator/channel-validator"

interface Server {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  userId: string
  createdAt: Date
  updatedAt: Date
  showModalCreateChannel: boolean
  onClickCreateChannel: () => void
}

const AddChannel = (currentServer: Server) => {
  const { mutate } = trpc.createChannel.useMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TChannelValidator>({
    resolver: zodResolver(ChannelValidator),
    defaultValues: {
      id: currentServer.id,
      name: "",
    },
  })

  const onSubmit = ({ name, id }: TChannelValidator) => {
    mutate({ name, id })
    currentServer.onClickCreateChannel()
  }

  return (
    <Dialog
      open={currentServer.showModalCreateChannel}
      onOpenChange={currentServer.onClickCreateChannel}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Créer votre salon</DialogTitle>
            <DialogDescription>
              Vous pourrez tout modifier plus tard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom du salon
              </Label>
              <Input
                {...register("name")}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddChannel
