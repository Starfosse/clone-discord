import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { ChannelValidator } from "@/lib/validator/channel-validator"

const editChannel = publicProcedure
  .input(ChannelValidator)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    return await prisma.channel.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        type: input.type,
      },
    })
  })

export default editChannel
