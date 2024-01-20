import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const MemberId = z.object({ id: z.string() })

const getUserByMember = publicProcedure
  .input(MemberId)
  .query(async ({ input }) => {
    return await prisma.user.findFirst({
      where: {
        members: {
          every: {
            id: input.id,
          },
        },
      },
    })
  })

export default getUserByMember
