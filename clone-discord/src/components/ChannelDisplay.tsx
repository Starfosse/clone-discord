import { trpc } from "@/app/_trpc/client"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Channel } from "@prisma/client"
import { Hash, Headphones, Video } from "lucide-react"
import { useState } from "react"
import EditChannel from "./modals/channel/EditChannel"
import Link from "next/link"
import ActiveUser from "./ActiveUser"

interface channelProps {
  channel: Channel
  refetchChannels: () => Promise<any>
  refetchChannelsGroups: () => Promise<any>
  refetchServer: () => Promise<any>
}

const ChannelDisplay = (channelProps: channelProps) => {
  const utils = trpc.useUtils()

  const [showModalEditChannel, setShowModalEditChannel] =
    useState(false)
  const { mutate: deleteChannel } =
    trpc.deleteChannel.useMutation({
      onSuccess: () => {
        utils.getChannelsGroups.invalidate()
        utils.getChannels.invalidate()
        utils.getChannelsByGroupId.invalidate()
      },
    })

  const channelId = {
    id: channelProps.channel.id,
  }
  const handleClickDeleteChannel = () => {
    deleteChannel(channelId)
  }

  const showModal = () => {
    setShowModalEditChannel(true)
  }
  const unShowModal = () => {
    setShowModalEditChannel(false)
  }
  return (
    <div className="">
      <Link
        href={`/server/${channelProps.channel.serverId}/channel/${channelId.id}`}>
        <ContextMenu>
          <ContextMenuTrigger className="flex items-center mt-1 pl-6 text-muted-foreground">
            {channelProps.channel.type === "TEXT" ? (
              <Hash width={14} />
            ) : channelProps.channel.type === "AUDIO" ? (
              <Headphones width={14} />
            ) : (
              <Video width={14} />
            )}
            &nbsp;{channelProps.channel.name}
          </ContextMenuTrigger>
          <ContextMenuContent className="text-white bg-tertiaryColor">
            <ContextMenuItem
              onClick={showModal}
              className="hover:cursor-pointer">
              Modifier le salon
            </ContextMenuItem>
            <ContextMenuItem
              onClick={handleClickDeleteChannel}
              className="hover:cursor-pointer">
              Supprimer le salon
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        {showModalEditChannel && (
          <EditChannel
            channel={channelProps.channel}
            // showModal={showModal}
            showModalEditChannel={showModalEditChannel}
            unShowModal={unShowModal}
          />
        )}
      </Link>
      <ActiveUser {...channelProps.channel} />
    </div>
  )
}

export default ChannelDisplay
