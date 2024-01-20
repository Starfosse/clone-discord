import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { ChannelValidator } from "@/lib/validator/channel-validator"

const createChannelByGroupId = publicProcedure
  .input(ChannelValidator)
  .mutation(async ({ input }) => {
    const user = await currentUser()

    if (!input.serverId) return

    const res = await prisma.channelGroup.update({
      where: {
        id: input.id,
      },
      data: {
        channels: {
          create: {
            serverId: input.serverId,
            name: input.name,
            type: input.type,
            isPrivate: input.isPrivate,
          },
        },
      },
    })
    for (let i = 0; i < input.rolesRequired.length; i++) {
      const res2 = await prisma.channel.update({
        where: {
          id: res.id,
        },
        data: {
          channelRole: {
            create: [
              {
                RoleId: input.rolesRequired[i],
              },
            ],
          },
        },
      })
    }
  })

export default createChannelByGroupId
