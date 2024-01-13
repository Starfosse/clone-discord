import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../trpc"
import { prisma } from "@/lib/db"
import { ChannelValidator } from "@/lib/validator/channel-validator"

const createChannel = publicProcedure
  .input(ChannelValidator)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    return await prisma.server.update({
      where: {
        id: input.id,
      },
      data: {
        channels: {
          create: {
            name: input.name,
          },
        },
      },
    })
  })

export default createChannel
