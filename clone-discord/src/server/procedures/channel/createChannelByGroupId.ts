import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { ChannelValidator } from "@/lib/validator/channel-validator"

const createChannelByGroupId = publicProcedure
  .input(ChannelValidator)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    if (!input.serverId) return
    return await prisma.channelGroup.update({
      where: {
        id: input.id,
      },
      data: {
        channels: {
          create: {
            serverId: input.serverId,
            name: input.name,
            type: input.type,
          },
        },
      },
    })
  })

export default createChannelByGroupId
