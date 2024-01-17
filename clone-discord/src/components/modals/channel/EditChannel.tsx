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
  FormDescription,
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
import { Channel, ChannelType } from "@prisma/client"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"

interface memberRoleIdLabel {
  id: string
  label: string
}

interface editChannelProps {
  channel: Channel
  showModalEditChannel: boolean
  unShowModal: () => void
}

const EditChannel = (
  editChannelProps: editChannelProps
) => {
  const utils = trpc.useUtils()
  const form = useForm<TChannelValidator>({
    resolver: zodResolver(ChannelValidator),
    defaultValues: {
      id: editChannelProps.channel.id,
      name: editChannelProps.channel.name,
      type: editChannelProps.channel.type,
      rolesRequired: [],
    },
  })

  const ChannelId = { id: editChannelProps.channel.id }
  const currentRequiredRoleData =
    trpc.getRolesByChannel.useQuery(ChannelId)
  const [currentRequiredRole, setCurrentRequiredRole] =
    useState<memberRoleIdLabel[] | undefined>()
  useEffect(() => {
    if (currentRequiredRoleData.data) {
      const items =
        currentRequiredRoleData.data.roleRequired.map(
          (memberRole) => ({
            id: memberRole.id,
            label: memberRole.role,
          })
        )
      setCurrentRequiredRole(items)
    }
  }, [currentRequiredRoleData.data])

  const serverId = {
    serverId: editChannelProps.channel.serverId,
  }
  const listRoleServer =
    trpc.getRoleServer.useQuery(serverId)
  const [currentListRoleServer, setCurrentListRoleServer] =
    useState<memberRoleIdLabel[] | undefined>()
  useEffect(() => {
    if (listRoleServer.data) {
      const items = listRoleServer.data.map(
        (memberRole) => ({
          id: memberRole.id,
          label: memberRole.role,
          value: true,
        })
      )
      setCurrentListRoleServer(items)
    }
  }, [listRoleServer.data])

  const { mutate: editChannel } =
    trpc.editChannel.useMutation({
      onSuccess: () => {
        utils.getChannelsGroups.invalidate()
        utils.getChannels.invalidate()
        utils.getChannelsByGroupId.invalidate()
      },
    })
  const onSubmit = ({
    name,
    id,
    type,
    rolesRequired,
  }: TChannelValidator) => {
    editChannel({ name, id, type, rolesRequired })
    editChannelProps.unShowModal()
  }

  const [isPrivate, setIsPrivate] = useState(false)
  const setPrivate = () => {
    setIsPrivate(!isPrivate)
  }
  return (
    <Dialog
      open={editChannelProps.showModalEditChannel}
      onOpenChange={editChannelProps.unShowModal}>
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
                        placeholder={
                          editChannelProps.channel.name
                        }
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
                      defaultValue={
                        editChannelProps.channel.type
                      }>
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
              <FormField
                control={form.control}
                name={"isPrivate"}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border px-2 m-2 gap-2 ml-6 relative left-2">
                    <div className="space-y-0.5">
                      <FormLabel className="">
                        Privé ?
                      </FormLabel>
                      <FormDescription>
                        Le salon ne sera visible que par les
                        rôles selectionnés
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        onClick={setPrivate}
                        // onChange={setPrivate}
                        checked={field.value}
                        // checked={action.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {currentListRoleServer &&
                currentRequiredRole &&
                isPrivate &&
                currentListRoleServer.map((item, index) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="rolesRequired"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center justify-between rounded-lg border p-2 m-2 gap-1 ml-6 relative left-2">
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                          <FormControl>
                            <Checkbox
                              checked={item.id.includes(
                                currentRequiredRole[index]
                                  ?.id ?? item.id
                              )}
                              onCheckedChange={(
                                checked
                              ) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      item.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) =>
                                          value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )
                    }}
                  />
                ))}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() =>
                  toast.success(
                    <div className="flex items-center">
                      <Check />
                      &nbsp;Le channel a bien été modifié
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
export default EditChannel
