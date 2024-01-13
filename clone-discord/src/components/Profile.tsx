"use client"

import { trpc } from "@/app/_trpc/client"
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ProfileValidator,
  TProfileValidator,
} from "@/lib/validator/profile-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { stateList } from "@prisma/client"
import { useForm } from "react-hook-form"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import { Separator } from "./ui/separator"
import Image from "next/image"
import { toast } from "sonner"
import { useState } from "react"
import { Check } from "lucide-react"

const Profile = () => {
  const { data, isLoading } = trpc.getUser.useQuery()

  const [open, setOpen] = useState(false)

  const form = useForm<TProfileValidator>({
    resolver: zodResolver(ProfileValidator),
    defaultValues: {
      imageUrl: data?.imageUrl ? data?.imageUrl : "",
      pseudo: data?.pseudo,
      state: stateList.BUSY,
    },
  })

  const { mutate } = trpc.updateUser.useMutation()

  const onSubmit = ({
    imageUrl,
    pseudo,
    state,
  }: TProfileValidator) => {
    console.log("ok")
    setOpen(false)
    mutate({ imageUrl, pseudo, state })
  }

  const stateUser = data?.state.toLocaleLowerCase()
  return (
    <>
      {data?.imageUrl && (
        <Image
          className="relative top-11 left-6 z-10 bg- rounded-full border-[3px] border-tertiaryColor"
          src={`/${stateUser}.png`}
          width={16}
          height={16}
          alt="ok"
        />
      )}
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          {isLoading ? (
            <p className="text-center text-xs text-white">
              Chargement
            </p>
          ) : (
            <Avatar className="cursor-pointer">
              <AvatarImage src={data?.imageUrl} />
              <AvatarFallback className="text-xs">
                {data?.pseudo}
              </AvatarFallback>
            </Avatar>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier le profil</DialogTitle>
            <DialogDescription>
              Ne modifiez que les champs voulus.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid py-4">
                {/* {data?.imageUrl && (
                  <Image
                    // className="relative top-11 left-6 z-10 bg- rounded-full border-[3px] border-tertiaryColor"
                    src={data.imageUrl}
                    width={16}
                    height={16}
                    alt="ok"
                  />
                )} */}
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4">
                      <FormLabel className="text-right">
                        Image de profil
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${data?.imageUrl}`}
                          {...field}
                          className="col-span-3"
                        />
                      </FormControl>
                      <FormMessage className="col-span-4 text-right" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pseudo"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4">
                      <FormLabel className="text-right">
                        Pseudo
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${data?.pseudo}`}
                          {...field}
                          className="col-span-3"
                        />
                      </FormControl>
                      <FormMessage className="col-span-4 text-right" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">
                        Etat
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="En ligne (par défaut)" />{" "}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          position="popper"
                          side="right"
                          sideOffset={25}>
                          <SelectGroup>
                            <SelectItem
                              value={stateList.ONLINE}
                              key={stateList.ONLINE}
                              slot="test">
                              <p className="flex">
                                <Image
                                  src="/online.png"
                                  alt="test"
                                  width={16}
                                  height={16}
                                  className=""
                                />
                                &nbsp;&nbsp;En ligne
                              </p>
                            </SelectItem>
                            <Separator className="w-5/6 my-1 mx-auto" />
                            <SelectItem
                              value={stateList.ABSENT}
                              key={stateList.ABSENT}>
                              <p className="flex">
                                <Image
                                  src="/absent.png"
                                  alt="test"
                                  width={16}
                                  height={16}
                                  className=""
                                />
                                &nbsp;&nbsp;Absent
                              </p>
                            </SelectItem>
                            <SelectItem
                              value={stateList.BUSY}
                              key={stateList.BUSY}
                              className="text-left">
                              <p className="flex">
                                <Image
                                  src="/busy.png"
                                  alt="test"
                                  width={16}
                                  height={16}
                                  className=""
                                />
                                &nbsp;&nbsp;Occupé
                              </p>
                              {/* <p className="text-[0.6rem] text-muted-foreground text-right">
                                Tu ne recevras aucune
                                notification
                              </p> */}
                            </SelectItem>
                            <SelectItem
                              value={stateList.OFFLINE}
                              key={stateList.OFFLINE}>
                              <p className="flex">
                                <Image
                                  src="/offline.png"
                                  alt="test"
                                  width={16}
                                  height={16}
                                  className=""
                                />
                                &nbsp;&nbsp;Deconnecté
                              </p>
                              {/* <p className="text-[0.6rem] text-muted-foreground">
                                Tu n'apparaîtras pas
                                connecté
                              </p> */}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

//TODO : ajouter imageurl de discord par défaut
//permettre d'importer son image
//ajouter preview image profile (carroussel shadcnui)
//ajouter une sous-description des state
//reload la page à la fin du formulaire
// gérer les states avec .map
export default Profile
