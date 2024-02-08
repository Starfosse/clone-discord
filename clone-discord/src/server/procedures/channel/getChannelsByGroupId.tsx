import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { authentifiedProcedure } from "@/server/middlewares/authentified"

const ChannelGroupId = z.object({ id: z.string() })

const getChannelsByGroupId = authentifiedProcedure
  .input(ChannelGroupId)
  .query(async ({ input }) => {
    const user = await currentUser()
    return prisma.channel.findMany({
      where: {
        channelGroupId: input.id,
      },
    })
  })

export default getChannelsByGroupId
