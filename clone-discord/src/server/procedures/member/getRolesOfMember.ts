import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const MemberId = z.object({ id: z.string() })
const getRolesOfMember = publicProcedure
  .input(MemberId)
  .query(async ({ input }) => {
    return await prisma.role.findMany({
      where: {
        memberRole: {
          some: {
            MemberId: input.id,
          },
        },
      },
    })
  })

export default getRolesOfMember
