"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const AddServer = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <button className="text-green-600 hover:text-white bg-secondaryColor rounded-full w-10 h-10 hover:rounded-xl hover:bg-green-600">
          <p className=" text-3xl relative bottom-1">+</p>{" "}
          {/* creer serv -> dialog : nom + image(facultatif)*/}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer votre serveur</DialogTitle>
          <DialogDescription>
            Vous pourrez tout modifier plus tard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Image du serveur
            </Label>
            <Input className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Nom du serveur
            </Label>
            <Input className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddServer
