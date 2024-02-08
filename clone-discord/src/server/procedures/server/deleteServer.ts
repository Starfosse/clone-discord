import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { z } from "zod"

const ServerId = z.object({ id: z.string() })

const deleteServer = publicProcedure
  .input(ServerId)
  .mutation(async ({ input }) => {
    return await prisma.server.delete({
      where: {
        id: input.id,
      },
    })
  })

export default deleteServer
