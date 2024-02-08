import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { authentifiedProcedure } from "@/server/middlewares/authentified"

const channelId = z.object({ channelId: z.string() })

const getChannelById = authentifiedProcedure
  .input(channelId)
  .query(async ({ input }) => {
    return prisma.channel.findFirst({
      where: {
        id: input.channelId,
      },
    })
  })

export default getChannelById
