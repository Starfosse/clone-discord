"use client"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { trpc } from "@/app/_trpc/client"
import { Channel, ChannelGroup } from "@prisma/client"
import { useEffect, useState } from "react"
import ChannelDisplay from "./ChannelDisplay"
import { ArrowBigDown } from "lucide-react"
import AddChannelByGroupId from "./modals/category/AddChannelByGroupId"
import EditCategory from "./modals/category/EditCategory"

interface channnelsGroupProps {
  channelsGroup: ChannelGroup
  refetchChannels: () => Promise<any>
  refetchChannelsGroups: () => Promise<any>
  refetchServer: () => Promise<any>
}

const ChannelsGroup = (cGProps: channnelsGroupProps) => {
  const ChannelGroupId = { id: cGProps.channelsGroup.id }
  const channels =
    trpc.getChannelsByGroupId.useQuery(ChannelGroupId)
  const [currentChannels, setCurrentChannels] = useState<
    Channel[] | undefined
  >()
  useEffect(() => {
    if (channels.data) setCurrentChannels(channels.data)
  }, [channels.data])
  const [showModalAddChannel, setShowModalAddChannel] =
    useState(false)

  const [showModalEditCategory, setShowModalEditCategory] =
    useState(false)

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
  const utils = trpc.useUtils()
  const { mutate: deleteChannel } =
    trpc.deleteCategory.useMutation({
      onSuccess: () => utils.getChannelsGroups.invalidate(),
    })
  const handleClickDeleteCategory = () => {
    const channelId = { id: cGProps.channelsGroup.id }
    deleteChannel(channelId)
  }
  return (
    <div className="mt-4 pl-2">
      <ContextMenu>
        <ContextMenuTrigger className="flex w-full items-center">
          {<ArrowBigDown />}{" "}
          <div>{cGProps.channelsGroup.name}</div>{" "}
          <div className="justify-end ml-auto text-muted-foreground pr-2">
            <button
              onClick={handleClickAddChannel}
              className="text-xl">
              +
            </button>{" "}
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

      {currentChannels &&
        currentChannels.map((channel) => (
          <div key={channel.id}>
            <ChannelDisplay
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
          // refetch
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
