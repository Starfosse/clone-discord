"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import { Button } from "@/components/ui/button"
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { trpc } from "@/app/_trpc/client"
import { Separator } from "./ui/separator"
import {
  useForm,
  SubmitHandler,
  Controller,
} from "react-hook-form"
import {
  ProfileValidator,
  TProfileValidator,
} from "@/lib/validator/profile-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"

const Profile = () => {
  const { data, isLoading } = trpc.getUser.useQuery()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TProfileValidator>({
    resolver: zodResolver(ProfileValidator),
  })

  const { mutate } = trpc.updateUser.useMutation()

  const onSubmit = ({
    imageUrl,
    pseudo,
    state,
  }: TProfileValidator) => {
    console.log("ok")
    console.log(state)
    console.log("ok")
    mutate({ imageUrl, pseudo, state })
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {isLoading ? (
            <p className="text-center text-xs text-white">
              Chargement
            </p>
          ) : (
            <Avatar className="cursor-pointer">
              <AvatarImage src="" />
              <AvatarFallback className="text-xs">
                {data?.pseudo}
              </AvatarFallback>
            </Avatar>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Modifier le profil</DialogTitle>
              <DialogDescription>
                Changez votre profil ici.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="imageUrl"
                  className="text-right">
                  Image de profil
                </Label>
                <Input
                  {...register("imageUrl")}
                  className={cn("col-span-3", {
                    "focus-visible:ring-red-500":
                      errors.imageUrl,
                  })}
                />
                {/* {errors?.imageUrl && (
                <p className="text-sm text-red-500">
                  {errors.imageUrl.message}
                </p>
              )} */}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="pseudo"
                  className="text-right">
                  Pseudo
                </Label>
                <Input
                  {...register("pseudo")}
                  className={cn("col-span-3", {
                    "focus-visible:ring-red-500":
                      errors.pseudo,
                  })}
                />
                {/* {errors?.pseudo && (
                <p className="text-sm text-red-500">
                  {errors.pseudo.message}
                </p>
              )} */}
              </div>
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label
                  htmlFor="state"
                  className="text-right">
                  Etat
                </Label>
                <Controller
                  name="state"
                  control={control}
                  rules={{
                    required: "ce champs est requis",
                  }}
                  render={({ field }) => (
                    <Select {...field}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="En ligne (par défaut)" />{" "}
                        {/* {`${data.etat}`}*/}
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        side="right">
                        <SelectGroup>
                          <SelectItem value="ONLINE">
                            En ligne
                          </SelectItem>
                          <Separator className="w-5/6 my-1 mx-auto" />
                          <SelectItem value="ABSENT">
                            Absent
                          </SelectItem>
                          <SelectItem value="BUSY">
                            Occupé
                            <p className="text-[0.6rem] text-muted-foreground">
                              Tu ne recevras aucune
                              notification
                            </p>
                          </SelectItem>
                          <SelectItem value="OFFLINE">
                            Deconnecté
                            <p className="text-[0.6rem] text-muted-foreground">
                              Tu n'apparaîtras pas connecté
                            </p>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button>Sauvegarder</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
// Ajouter un carroussel d'image prédéfinies pour la photo de profil
// Ajouter un sonner pour valider les modifs
export default Profile
