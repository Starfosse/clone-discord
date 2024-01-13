"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { Check } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { Separator } from "../ui/separator"
import { trpc } from "@/app/_trpc/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ServerValidatorId,
  TServerValidatorId,
} from "@/lib/validator/server-validator-id"
import { Label } from "../ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Server {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  userId: string
  createdAt: Date
  updatedAt: Date
  showModalEditServer: boolean
  onClickEditServer: () => void
  refetch: () => Promise<any>
}

const EditServer = (currentServer: Server) => {
  // const form = useForm<TServerValidatorId>({
  //   resolver: zodResolver(ServerValidatorId),
  //   defaultValues: {
  //     imageUrl: currentServer.imageUrl,
  //     name: currentServer.name,
  //     id: currentServer.id,
  //   },
  // })

  const router = useRouter()
  const { handleSubmit, register } =
    useForm<TServerValidatorId>({
      resolver: zodResolver(ServerValidatorId),
      defaultValues: {
        imageUrl: currentServer.imageUrl,
        name: currentServer.name,
        id: currentServer.id,
      },
    })
  const id = currentServer.id
  const utils = trpc.useUtils()

  const { mutate } = trpc.editServer.useMutation({
    onSuccess: () => {
      // utils.getChannels.invalidate()
      currentServer.refetch()
    },
  })
  const onSubmit = ({
    name,
    imageUrl,
    id,
  }: TServerValidatorId) => {
    // console.log("good")
    currentServer.onClickEditServer()
    mutate({ name, imageUrl, id })
    // currentServer.()
    // router.refresh()
    // router.push("/")
    // router.push(`/server/${currentServer.id}`)
  }
  return (
    <Dialog open={currentServer.showModalEditServer}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Modifier le profil du server
          </DialogTitle>
          <DialogDescription>
            Ne modifiez que les champs voulus.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Image du serveur (optionnel)
              </Label>
              <Input
                {...register("imageUrl")}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Nom du serveur
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
              Sauvegarder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
// TODO gerer les erreurs form et validator
export default EditServer
