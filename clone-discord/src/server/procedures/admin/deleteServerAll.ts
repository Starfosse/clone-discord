import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"

const deleteServerAll = publicProcedure.mutation(
  async () => {
    return await prisma.server.deleteMany()
  }
)

export default deleteServerAll
