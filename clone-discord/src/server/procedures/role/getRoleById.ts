import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const memberRoleId = z.object({ id: z.string() })

const getRoleById = authentifiedProcedure
  .input(memberRoleId)
  .query(async ({ input }) => {
    return await prisma.role.findFirst({
      where: { id: input.id },
    })
  })

export default getRoleById
