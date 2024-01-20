import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { z } from "zod"

const channelId = z.object({ channelId: z.string() })

const getChannelById = publicProcedure
  .input(channelId)
  .query(async ({ input }) => {
    return prisma.channel.findFirst({
      where: {
        id: input.channelId,
      },
    })
  })

export default getChannelById
