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
import {
  ChannelValidator,
  TChannelValidator,
} from "@/lib/validator/channel-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Check,
  Hash,
  Headphones,
  Video,
} from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "../../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import { Input } from "../../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import { Separator } from "../../ui/separator"
import { ChannelType } from "@prisma/client"

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
  refetch: () => Promise<any>
}

const AddChannel = (currentServer: Server) => {
  const utils = trpc.useUtils()
  const serverId = { serverId: currentServer.id }
  const { mutate } = trpc.createChannel.useMutation({
    onSuccess: () => utils.getChannels.invalidate(serverId),
  })

  const form = useForm<TChannelValidator>({
    resolver: zodResolver(ChannelValidator),
    defaultValues: {
      id: currentServer.id,
      name: "",
      type: ChannelType.TEXT,
    },
  })

  const onSubmit = ({
    name,
    id,
    type,
  }: TChannelValidator) => {
    mutate({ name, id, type })
    currentServer.onClickCreateChannel()
  }

  return (
    <Dialog
      open={currentServer.showModalCreateChannel}
      onOpenChange={currentServer.onClickCreateChannel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter</DialogTitle>
          <DialogDescription>
            Vous pourrez toujours modifier ces informations
            plus tard
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-x-4">
                    <FormLabel className="text-right">
                      Nom du channel
                    </FormLabel>
                    <FormControl>
                      <Input
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
                name="type"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">
                      Type de channel
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Texte" />{" "}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        position="popper"
                        side="right"
                        sideOffset={25}>
                        <SelectGroup>
                          <SelectItem
                            value={ChannelType.TEXT}
                            key={ChannelType.TEXT}
                            slot="test">
                            <p className="flex">
                              <Hash width={14} />
                              &nbsp;&nbsp;Texte
                            </p>
                          </SelectItem>
                          <SelectItem
                            value={ChannelType.AUDIO}
                            key={ChannelType.AUDIO}>
                            <p className="flex">
                              <Headphones width={14} />
                              &nbsp;&nbsp;Audio
                            </p>
                          </SelectItem>
                          <SelectItem
                            value={ChannelType.VIDEO}
                            key={ChannelType.VIDEO}
                            className="text-left">
                            <p className="flex">
                              <Video width={14} />
                              &nbsp;&nbsp;Vidéo
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
                onClick={() =>
                  toast.success(
                    <div className="flex items-center">
                      <Check />
                      &nbsp;Le channel a bien été ajouté
                    </div>,
                    { duration: 3000 }
                  )
                }>
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddChannel