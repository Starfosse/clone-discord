import { Channel } from "@prisma/client"
import { Hash, Headphones, Video } from "lucide-react"

interface channelProps {
  channel: Channel
}

const ChannelDisplay = (channelProps: channelProps) => {
  return (
    <div className="flex items-center mt-1 pl-6 text-muted-foreground">
      {channelProps.channel.type === "TEXT" ? (
        <Hash width={14} />
      ) : channelProps.channel.type === "AUDIO" ? (
        <Headphones width={14} />
      ) : (
        <Video width={14} />
      )}
      {channelProps.channel.name}
    </div>
  )
}

export default ChannelDisplay
