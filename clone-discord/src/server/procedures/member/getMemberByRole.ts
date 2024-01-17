import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"
const ServerId = z.object({ id: z.string() })
const getMemberByRole = publicProcedure
  .input(ServerId)
  .query(async ({ input }) => {
    return await prisma.server.findUnique({
      where: { id: input.id },
      include: {
        members: {
          include: { role: true },
        },
        memberRoles: true,
      },
    })
  })

export default getMemberByRole
