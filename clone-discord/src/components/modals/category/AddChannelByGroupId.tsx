"use client"

import { trpc } from "@/app/_trpc/client"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import {
  ChannelValidator,
  TChannelValidator,
} from "@/lib/validator/channel-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChannelGroup, ChannelType } from "@prisma/client"
import {
  Check,
  Hash,
  Headphones,
  Video,
} from "lucide-react"
import { useEffect, useState } from "react"
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

interface cHGroup {
  channelsGroup: ChannelGroup
  showModalAddChannel: boolean
  closeAddChannel: () => void
  refetchListChannels: () => Promise<any>
  refetchCategory: () => Promise<any>
}

interface memberRoleIdLabel {
  id: string
  label: string
}

const AddChannelByGroupId = (cHGroup: cHGroup) => {
  const [currentListRoleServer, setCurrentListRoleServer] =
    useState<memberRoleIdLabel[] | undefined>()
  const [isPrivate, setIsPrivate] = useState(false)
  const serverId = {
    serverId: cHGroup.channelsGroup.serverId,
  }

  const listRoleServer =
    trpc.getRoleServer.useQuery(serverId)
  const form = useForm<TChannelValidator>({
    resolver: zodResolver(ChannelValidator),
    defaultValues: {
      serverId: cHGroup.channelsGroup.serverId,
      id: cHGroup.channelsGroup.id,
      name: "",
      type: ChannelType.TEXT,
      isPrivate: false,
      rolesRequired: [],
    },
  })

  useEffect(() => {
    if (listRoleServer.data) {
      const items = listRoleServer.data.map(
        (memberRole) => ({
          id: memberRole.id,
          label: memberRole.role,
        })
      )
      setCurrentListRoleServer(items)
    }
  }, [listRoleServer.data])

  const { mutate } =
    trpc.createChannelByGroupId.useMutation({
      onSuccess: () => {
        cHGroup.refetchCategory()
        cHGroup.refetchListChannels()
        toast.success(
          <div className="flex items-center">
            <Check />
            &nbsp;Le channel a bien été ajouté
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
    serverId,
  }: TChannelValidator) => {
    mutate({
      name,
      id,
      type,
      rolesRequired,
      isPrivate,
      serverId,
    })
    cHGroup.closeAddChannel()
  }

  const setPrivate = () => {
    setIsPrivate(!isPrivate)
  }

  return (
    <Dialog
      open={cHGroup.showModalAddChannel}
      onOpenChange={cHGroup.closeAddChannel}>
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
                        checked={field.value}
                        // checked={action.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {currentListRoleServer &&
                isPrivate &&
                currentListRoleServer.map((item) => (
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
                              checked={field.value?.includes(
                                item.id
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
              <Button type="submit">Enregistrer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddChannelByGroupId
