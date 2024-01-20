import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const memberRoleId = z.object({ id: z.string() })

const getRoleById = publicProcedure
  .input(memberRoleId)
  .query(async ({ input }) => {
    return await prisma.role.findFirst({
      where: { id: input.id },
    })
  })

export default getRoleById
