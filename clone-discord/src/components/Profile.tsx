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

const Profile = () => {
  const { data } = trpc.getUser.useQuery()
  return (
    <>
      {/* <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">
              Blueberry
            </SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">
              Pineapple
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}

      <Dialog>
        <DialogTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="" alt="" />
            {data ? (
              <AvatarFallback className="text-xs">
                {data?.pseudo}
              </AvatarFallback>
            ) : (
              <p>oups</p>
            )}
          </Avatar>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save
              when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Image de profil
              </Label>
              <Input
                id="name"
                value="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="username"
                className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value="@peduarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label
                htmlFor="username"
                className="text-right">
                Etat
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="En ligne (par défaut)" />{" "}
                  {/* {`${data.etat}`}*/}
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  side="right">
                  <SelectGroup>
                    <SelectItem value="apple">
                      En ligne
                    </SelectItem>
                    <Separator className="w-5/6 my-1 mx-auto" />
                    <SelectItem value="blueberry">
                      Absent
                    </SelectItem>
                    <SelectItem value="banana">
                      Occupé
                      <p className="text-[0.6rem] text-muted-foreground">
                        Tu ne recevras aucune notification
                      </p>
                    </SelectItem>
                    <SelectItem value="grapes">
                      Deconnecté
                      <p className="text-[0.6rem] text-muted-foreground">
                        Tu n'apparaîtras pas connecté
                      </p>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
// Ajouter un carroussel d'image prédéfinies pour la photo de profil
// Ajouter un sonner pour valider les modifs
export default Profile
