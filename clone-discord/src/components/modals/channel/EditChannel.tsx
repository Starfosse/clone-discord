"use client"

import { trpc } from "@/app/_trpc/client"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import {
  ChannelValidator,
  TChannelValidator,
} from "@/lib/validator/channel-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Channel, ChannelType } from "@prisma/client"
import {
  Check,
  Hash,
  Headphones,
  Video,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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

interface memberRoleIdLabel {
  id: string
  label: string
  value: boolean
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
      isPrivate: editChannelProps.channel.isPrivate,
      rolesRequired: [],
      serverId: editChannelProps.channel.serverId,
    },
  })

  const ChannelId = { id: editChannelProps.channel.id }
  const currentRequiredRoleData =
    trpc.getRolesByChannel.useQuery(ChannelId)
  const serverId = {
    serverId: editChannelProps.channel.serverId,
  }
  const listRoleServer =
    trpc.getRoleServer.useQuery(serverId)
  const [currentListRoleServer, setCurrentListRoleServer] =
    useState<memberRoleIdLabel[] | undefined>()
  useEffect(() => {
    console.log(listRoleServer.data)
    console.log(currentRequiredRoleData.data)
    if (
      listRoleServer.data &&
      currentRequiredRoleData.data
    ) {
      console.log("test")
      const items = listRoleServer.data.map(
        (memberRole) => ({
          id: memberRole.id,
          label: memberRole.role,
          value: currentRequiredRoleData.data.some(
            (requiredRole) =>
              requiredRole.id.includes(memberRole.id)
          ),
        })
      )
      console.log(items)
      setCurrentListRoleServer(items)
      console.log(items)
      console.log(currentListRoleServer) // currentlistROleServer non attribué
    }
  }, [listRoleServer.data, currentRequiredRoleData.data])
  console.log(currentListRoleServer)
  const { mutate: editChannel } =
    trpc.editChannel.useMutation({
      onSuccess: () => {
        utils.getChannelsGroups.invalidate()
        utils.getChannels.invalidate()
        utils.getChannelsByGroupId.invalidate()
        toast.success(
          <div className="flex items-center">
            <Check />
            &nbsp;Le channel a bien été modifié
          </div>,
          { duration: 3000 }
        )
      },
    })

  const onSubmit = ({
    name,
    id,
    type,
    rolesRequired,
    isPrivate,
  }: TChannelValidator) => {
    console.log("test")
    rolesRequired =
      currentListRoleServer
        ?.filter((role) => role.value === true)
        ?.map((role) => role.id) ?? []
    console.log("test")
    editChannel({
      name,
      id,
      type,
      rolesRequired,
      isPrivate,
    })
    console.log("test")
    editChannelProps.unShowModal()
  }
  const [isPrivate, setIsPrivate] = useState(false)
  const channelPrivate = trpc.isPrivate.useQuery(ChannelId)
  useEffect(() => {
    if (
      channelPrivate.data &&
      channelPrivate.data.isPrivate === true
    )
      setIsPrivate(true)
  }, [channelPrivate.data])

  const setPrivate = () => {
    setIsPrivate(!isPrivate)
  }

  const updateMemberRoleValue = (roleId: string): void => {
    const updatedRoles = currentListRoleServer?.map(
      (role) =>
        role.id === roleId
          ? { ...role, value: !role.value }
          : role
    )
    setCurrentListRoleServer(updatedRoles)
    console.log(currentListRoleServer)
    console.log(updatedRoles)
  }
  return (
    <Dialog
      open={true}
      onOpenChange={editChannelProps.unShowModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier</DialogTitle>
          <DialogDescription>
            Vous pourrez toujours modifier ces informations
            plus tard
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid py-2">
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
                        onChange={setPrivate}
                        checked={isPrivate}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {currentListRoleServer &&
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
                          className="max-w-[350px] flex flex-row items-center justify-between rounded-lg border p-2 m-2 gap-1 ml-6 relative left-2">
                          <FormLabel className="font-normal truncate">
                            {item.label}
                          </FormLabel>
                          <FormControl>
                            <Checkbox
                              checked={
                                currentListRoleServer[index]
                                  .value
                              }
                              onCheckedChange={() => {
                                updateMemberRoleValue(
                                  item.id
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
            {/* <DialogFooter>
              <Button type="submit">Enregistrer</Button>
            </DialogFooter> */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default EditChannel
