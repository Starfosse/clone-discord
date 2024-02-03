"use client"

import { trpc } from "@/app/_trpc/client"
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
  ServerValidator,
  TServerValidator,
} from "@/lib/validator/server-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Check } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface AddServerProps {
  refetch: () => Promise<any>
}
const AddServer = (AddServerProps: AddServerProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const utils = trpc.useUtils()
  const { mutate } = trpc.createServer.useMutation({
    onSuccess: () => {
      AddServerProps.refetch()
      utils.getUserListServ.invalidate()
      toast.success(
        <div className="flex items-center">
          <Check />
          &nbsp;Votre server a bien été enregistré
        </div>,
        { duration: 3000 }
      )
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<TServerValidator>({
    resolver: zodResolver(ServerValidator),
    defaultValues: {
      imageUrl: "",
      name: "",
    },
  })

  const onSubmit = ({
    name,
    imageUrl,
  }: TServerValidator) => {
    setOpen(false)
    mutate({ name, imageUrl })
    resetField("name")
    resetField("imageUrl")
  }
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <button className="text-green-600 hover:text-white bg-secondaryColor rounded-full w-10 h-10 hover:rounded-xl hover:bg-green-600">
          <p className=" text-3xl relative bottom-1">+</p>{" "}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Créer votre serveur</DialogTitle>
            <DialogDescription>
              Vous pourrez tout modifier plus tard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="imageUrl"
                className="text-right">
                Image du serveur (optionnel)
              </Label>
              <Input
                {...register("imageUrl")}
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
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddServer
