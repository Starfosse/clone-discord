"use client"
import { trpc } from "@/app/_trpc/client"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import permissions from "@/lib/interface/permissions"
import { cn } from "@/lib/utils"
import { Channel, ChannelGroup } from "@prisma/client"
import { ArrowBigDown } from "lucide-react"
import { useEffect, useState } from "react"
import ChannelDisplay from "./ChannelDisplay"
import AddChannelByGroupId from "./modals/category/AddChannelByGroupId"
import EditCategory from "./modals/category/EditCategory"

interface channnelsGroupProps {
  channelsGroup: ChannelGroup
  refetchChannels: () => Promise<any>
  refetchChannelsGroups: () => Promise<any>
  refetchServer: () => Promise<any>
  listPermissions: permissions
}

const ChannelsGroup = (cGProps: channnelsGroupProps) => {
  const ChannelGroupId = { id: cGProps.channelsGroup.id }
  const utils = trpc.useUtils()
  const [currentChannels, setCurrentChannels] = useState<
    Channel[] | undefined
  >()
  const [isOpen, setIsOpen] = useState(true)
  const [showModalAddChannel, setShowModalAddChannel] =
    useState(false)
  const [showModalEditCategory, setShowModalEditCategory] =
    useState(false)

  const channels =
    trpc.getChannelsByGroupId.useQuery(ChannelGroupId)

  useEffect(() => {
    if (channels.data) setCurrentChannels(channels.data)
  }, [channels.data])

  const { mutate: deleteChannel } =
    trpc.deleteCategory.useMutation({
      onSuccess: () => utils.getChannelsGroups.invalidate(),
    })

  const showModal = () => {
    setShowModalEditCategory(true)
  }
  const unShowModal = () => {
    setShowModalEditCategory(false)
  }
  const handleClickAddChannel = () => {
    setShowModalAddChannel(true)
  }
  const closeAddChannel = () => {
    setShowModalAddChannel(false)
  }
  const handleClickDeleteCategory = () => {
    const channelId = { id: cGProps.channelsGroup.id }
    deleteChannel(channelId)
  }
  console.log(cGProps.listPermissions.channel_Management)
  return (
    <div className="mt-4 pl-2">
      {cGProps.listPermissions.channel_Management ? (
        <div>
          <ContextMenu>
            <ContextMenuTrigger className="flex w-full items-center">
              <ArrowBigDown
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "h-6 w-6 transition-all text-muted-foreground flex-shrink-0 hover:cursor-pointer",
                  {
                    "-rotate-90": !isOpen,
                  }
                )}
              />
              <div className="overflow-ellipsis overflow-hidden whitespace-nowrap px-1">
                {cGProps.channelsGroup.name}
              </div>
              <div className="justify-end ml-auto text-muted-foreground pr-2">
                <button
                  onClick={handleClickAddChannel}
                  className="text-xl">
                  +
                </button>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={showModal}>
                Modifier la catégorie
              </ContextMenuItem>
              <ContextMenuItem
                onClick={handleClickDeleteCategory}>
                Supprimer la catégorie
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      ) : (
        <div className="flex w-full items-center">
          <ArrowBigDown
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "h-6 w-6 transition-all text-muted-foreground flex-shrink-0",
              {
                "-rotate-90": !isOpen,
              }
            )}
          />
          <div className="overflow-ellipsis overflow-hidden whitespace-nowrap px-1">
            {cGProps.channelsGroup.name}
          </div>
        </div>
      )}

      {isOpen &&
        currentChannels &&
        cGProps.listPermissions &&
        currentChannels.map((channel) => (
          <div key={channel.id}>
            <ChannelDisplay
              listPermissions={cGProps.listPermissions}
              channel={channel}
              refetchChannels={cGProps.refetchChannels}
              refetchChannelsGroups={
                cGProps.refetchChannelsGroups
              }
              refetchServer={cGProps.refetchServer}
            />
          </div>
        ))}

      {showModalAddChannel && (
        <AddChannelByGroupId
          channelsGroup={cGProps.channelsGroup}
          showModalAddChannel={showModalAddChannel}
          closeAddChannel={closeAddChannel}
          refetchListChannels={
            cGProps.refetchChannelsGroups
          }
          refetchCategory={channels.refetch}
        />
      )}

      {showModalEditCategory && (
        <EditCategory
          ChannelGroup={cGProps.channelsGroup}
          showModalEditCategory={showModalEditCategory}
          unShowModal={unShowModal}
        />
      )}
    </div>
  )
}

export default ChannelsGroup
