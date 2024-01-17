import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { ChannelValidator } from "@/lib/validator/channel-validator"

const createChannel = publicProcedure
  .input(ChannelValidator)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    const res = await prisma.channel.create({
      data: {
        name: input.name,
        type: input.type,
        isPrivate: input.isPrivate,
        serverId: input.id,
      },
    })
    for (let i = 0; i < input.rolesRequired.length; i++) {
      const res2 = await prisma.channel.update({
        where: {
          id: res.id,
        },
        data: {
          roleRequired: {
            connect: [{ id: input.rolesRequired[i] }],
          },
        },
      })
    }
  })

export default createChannel
