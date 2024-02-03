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
import { uploadFile } from "@/lib/upload.action"
import {
  ProfileValidator,
  TProfileValidator,
} from "@/lib/validator/profile-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, stateList } from "@prisma/client"
import { Check } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import { Separator } from "./ui/separator"

const Profile = () => {
  const profileData = trpc.getUser.useQuery()

  const [currentProfile, setCurrentProfile] = useState<
    User | undefined
  >()

  useEffect(() => {
    if (profileData.data) {
      setCurrentProfile(profileData.data)
      setTmpImgUser(profileData.data.imageUrl)
    }
  }, [profileData.data])

  const [open, setOpen] = useState(false)

  const form = useForm<TProfileValidator>({
    resolver: zodResolver(ProfileValidator),
    defaultValues: {
      pseudo: currentProfile?.pseudo,
      state: stateList.BUSY,
    },
  })

  const { mutate } = trpc.updateUser.useMutation({
    onSuccess: () => profileData.refetch(),
  })
  const [tmpImgUser, setTmpImgUser] = useState<
    string | undefined
  >()
  const [currentFormaData, setCurrentFormaData] =
    useState<FormData | null>()
  const getBlobUrl = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData()
    if (e.target.files) {
      const file = e.target.files[0]
      formData.append("file", file)
      setCurrentFormaData(formData)
      // if(tmpImgUser !== currentProfile?.imageUrl) // supprime l'image de preview précédente
      const url = await uploadFile(formData)
      setTmpImgUser(url)
    }
  }

  const onSubmit = async ({
    pseudo,
    state,
    imageUrl,
  }: TProfileValidator) => {
    setOpen(false)
    if (currentFormaData)
      imageUrl = await uploadFile(currentFormaData)
    mutate({ imageUrl, pseudo, state })
    form.reset()
  }

  const stateUser =
    currentProfile?.state.toLocaleLowerCase()
  return (
    <>
      {currentProfile && (
        <Image
          className="relative top-11 left-6 z-10 rounded-full border-[3px] border-tertiaryColor"
          src={`/${stateUser}.png`}
          width={16}
          height={16}
          alt="ok"
        />
      )}
      {currentProfile && (
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            {profileData.isLoading ? (
              <p className="text-center text-xs text-white">
                Chargement
              </p>
            ) : (
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={currentProfile.imageUrl}
                />
                <AvatarFallback className="text-xs">
                  {currentProfile?.pseudo}
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
                  {tmpImgUser && (
                    <Image
                      className="relative mx-auto z-10 mb-8 rounded-full border-[1px] border-tertiaryColor object-cover object-center"
                      src={tmpImgUser}
                      width={60}
                      height={60}
                      alt="ok"
                    />
                  )}
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
                            type="file"
                            placeholder={`${currentProfile?.imageUrl}`}
                            {...field}
                            className="col-span-3"
                            onChange={getBlobUrl}
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
                            placeholder={`${currentProfile?.pseudo}`}
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
                    onClick={() => {
                      toast.success(
                        <div className="flex items-center">
                          <Check />
                          &nbsp;Vos modifications ont été
                          enregristrées
                        </div>,
                        { duration: 3000 }
                      )
                    }}>
                    Sauvegarder
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default Profile
