import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { z } from "zod"

const ServerId = z.object({ id: z.string() })

const deleteServer = authentifiedProcedure
  .input(ServerId)
  .mutation(async ({ input }) => {
    return await prisma.server.delete({
      where: {
        id: input.id,
      },
    })
  })

export default deleteServer
