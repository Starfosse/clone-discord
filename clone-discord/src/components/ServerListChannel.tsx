import { trpc } from "@/app/_trpc/client"

interface Server {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

type serverId = {
  serverId: Server["id"]
}
const ServerListChannel = (currentServer: Server) => {
  const serverId = { serverId: currentServer.id }
  const { data: channels } =
    trpc.getChannels.useQuery(serverId)
  const textChannels = channels?.filter(
    (channel) => channel.type === "TEXT"
  )
  const audioChannels = channels?.filter(
    (channel) => channel.type === "AUDIO"
  )
  return (
    <>
      <div className="flex flex-col items-start text-muted-foreground">
        <div className="py-1">Salons textuel</div>
        {textChannels &&
          textChannels.map((textChannel) => (
            <div key={textChannel.id}>
              {textChannel.name}
            </div>
          ))}
        <div className="py-1">Salons audio</div>
        {audioChannels &&
          audioChannels.map((audioChannel) => (
            <div key={audioChannel.id}>
              {audioChannel.name}
            </div>
          ))}
      </div>
    </>
  )
}

export default ServerListChannel
