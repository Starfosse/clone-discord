import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { authentifiedProcedure } from "@/server/middlewares/authentified"

const ServerId = z.object({ serverId: z.string() })

const getChannelsGroups = authentifiedProcedure
  .input(ServerId)
  .query(async ({ input }) => {
    const user = await currentUser()
    return prisma.channelGroup.findMany({
      where: {
        serverId: input.serverId,
      },
      orderBy: { createdAt: "asc" },
    })
  })

export default getChannelsGroups
