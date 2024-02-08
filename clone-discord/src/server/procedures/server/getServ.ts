import { prisma } from "@/lib/db"
import { publicProcedure } from "../../trpc"
import { z } from "zod"
import { authentifiedProcedure } from "@/server/middlewares/authentified"

const ServerId = z.object({ serverId: z.string() })

const getServer = authentifiedProcedure
  .input(ServerId)
  .query(async ({ input }) => {
    return await prisma.server.findFirst({
      where: {
        id: input.serverId,
      },
    })
  })

export default getServer
