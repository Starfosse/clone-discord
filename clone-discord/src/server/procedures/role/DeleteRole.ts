import { z } from "zod"
import { publicProcedure } from "../../trpc"
import { currentUser } from "@clerk/nextjs"
import { prisma } from "@/lib/db"

const memberRoleId = z.object({ id: z.string() })

const deleteRole = publicProcedure
  .input(memberRoleId)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    return await prisma.role.delete({
      where: {
        id: input.id,
      },
    })
  })

export default deleteRole
