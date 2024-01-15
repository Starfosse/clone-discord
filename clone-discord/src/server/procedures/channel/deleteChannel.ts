import { prisma } from "@/lib/db"
import { publicProcedure } from "../../trpc"
import { z } from "zod"

const channelId = z.object({
  id: z.string(),
})

const deleteChannel = publicProcedure
  .input(channelId)
  .mutation(async ({ input }) => {
    return await prisma.channel.delete({
      where: {
        id: input.id,
      },
    })
  })

export default deleteChannel
