import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { z } from "zod"

const ServerId = z.object({ serverId: z.string() })

const getChannels = publicProcedure
  .input(ServerId)
  .query(async ({ input }) => {
    const user = await currentUser()
    return prisma.channel.findMany({
      where: {
        serverId: input.serverId,
      },
    })
  })

export default getChannels
