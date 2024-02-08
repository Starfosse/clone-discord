"use client"

import { trpc } from "@/app/_trpc/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { uploadFile } from "@/lib/upload.action"
import { cn } from "@/lib/utils"
import {
  ServerValidatorId,
  TServerValidatorId,
} from "@/lib/validator/server-validator-id"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"

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
  const [tmpImgUser, setTmpImgUser] = useState<
    string | undefined
  >(currentServer.imageUrl ?? undefined)
  const [currentFormaData, setCurrentFormaData] =
    useState<FormData | null>()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TServerValidatorId>({
    resolver: zodResolver(ServerValidatorId),
    defaultValues: {
      imageUrl: currentServer.imageUrl,
      name: currentServer.name,
      id: currentServer.id,
    },
  })

  const { mutate } = trpc.editServer.useMutation({
    onSuccess: () => {
      currentServer.refetch()
      toast.success(
        <div className="flex items-center">
          <Check />
          &nbsp;Vos modifications ont été enregristrées
        </div>,
        { duration: 3000 }
      )
    },
  })

  const getBlobUrl = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData()
    if (e.target.files) {
      const file = e.target.files[0]
      formData.append("file", file)
      setCurrentFormaData(formData)
      const url = await uploadFile(formData)
      setTmpImgUser(url)
    }
  }

  const onSubmit = ({
    name,
    imageUrl,
    id,
  }: TServerValidatorId) => {
    currentServer.onClickEditServer()
    mutate({ name, imageUrl, id })
  }
  return (
    <Dialog
      open={currentServer.showModalEditServer}
      onOpenChange={currentServer.onClickEditServer}>
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
              {tmpImgUser && (
                <Image
                  className=" col-span-4 mt-2 relative mx-auto z-10 mb-8 rounded-full border-[1px] border-tertiaryColor object-cover object-center"
                  src={tmpImgUser}
                  width={60}
                  height={60}
                  alt="ok"
                />
              )}
              <Label htmlFor="name" className="text-right">
                Image du serveur (optionnel)
              </Label>
              <Input
                type="file"
                {...register("imageUrl")}
                onChange={getBlobUrl}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                className={cn("text-right", {
                  "text-red-500": errors.name,
                })}>
                Nom du serveur
              </Label>
              <Input
                {...register("name")}
                className="col-span-3"
              />
              {errors.name && (
                <p
                  className="col-span-4 text-red-500 text-right"
                  role="alert">
                  {errors.name.message}{" "}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Sauvegarder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default EditServer
