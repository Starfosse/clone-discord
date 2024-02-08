import { z } from "zod"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"

const ServerId = z.object({ serverId: z.string() })

const getRoleServer = authentifiedProcedure
  .input(ServerId)
  .query(async ({ input }) => {
    return await prisma.role.findMany({
      where: { serverId: input.serverId },
    })
  })

export default getRoleServer
