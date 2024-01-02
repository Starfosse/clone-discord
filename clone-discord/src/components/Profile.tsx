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
import {
  ItemIndicator,
  SelectItemIndicator,
  SelectItemText,
} from "@radix-ui/react-select"

const Profile = () => {
  const { data, isLoading } = trpc.getUser.useQuery()

  const form = useForm<TProfileValidator>({
    resolver: zodResolver(ProfileValidator),
    defaultValues: {
      imageUrl: data?.imageUrl,
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
          <DialogHeader>
            <DialogTitle>Modifier le profil</DialogTitle>
            <DialogDescription>
              Ne modifiez que les champs voulus.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid py-4">
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
                              En ligne
                            </SelectItem>

                            <Separator className="w-5/6 my-1 mx-auto" />
                            <SelectItem
                              value={stateList.ABSENT}
                              key={stateList.ABSENT}>
                              Absent
                            </SelectItem>
                            <SelectItem
                              value={stateList.BUSY}
                              key={stateList.BUSY}
                              className="text-left">
                              Occupé
                              {/* <p className="text-[0.6rem] text-muted-foreground text-right">
                                Tu ne recevras aucune
                                notification
                              </p> */}
                            </SelectItem>
                            <SelectItem
                              value={stateList.OFFLINE}
                              key={stateList.OFFLINE}
                              textValue="Tu n'apparaîtras pas
                              connecté">
                              Deconnecté
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
                <Button>Sauvegarder</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
// Ajouter un carroussel d'image prédéfinies pour la photo de profil
//ajouter preview image profile
// Ajouter un sonner pour valider les modifs
//ajouter une sous-description des state
export default Profile
