import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import {
  protectedProcedure,
  publicProcedure,
} from "@/server/trpc"

const deleteServerAll = authentifiedProcedure.mutation(
  async () => {
    return await prisma.server.deleteMany()
  }
)

export default deleteServerAll
