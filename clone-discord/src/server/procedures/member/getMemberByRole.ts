import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"
const ServerId = z.object({ id: z.string() })
const getMemberByRole = authentifiedProcedure
  .input(ServerId)
  .query(async ({ input }) => {
    return await prisma.server.findUnique({
      where: { id: input.id },
      include: {
        members: {
          include: { role: true },
        },
        roles: true,
      },
    })
  })

export default getMemberByRole
