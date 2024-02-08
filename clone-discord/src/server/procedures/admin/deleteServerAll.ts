import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"

const deleteServerAll = authentifiedProcedure.mutation(
  async ({ ctx }) => {
    return await prisma.server.deleteMany()
  }
)

export default deleteServerAll
