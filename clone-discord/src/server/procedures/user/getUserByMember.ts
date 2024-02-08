import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const MemberId = z.object({ id: z.string() })

const getUserByMember = authentifiedProcedure
  .input(MemberId)
  .query(async ({ input }) => {
    return await prisma.user.findFirst({
      where: {
        members: {
          some: {
            userId: input.id,
          },
        },
      },
    })
  })

export default getUserByMember
