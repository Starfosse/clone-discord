import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const userFriendId = z.object({ id: z.string() })

const editMessageShown = authentifiedProcedure
  .input(userFriendId)
  .mutation(async ({ input }) => {
    return await prisma.inputChat.updateMany({
      where: {
        OR: [
          {
            AND: [
              {
                userFriendId: input.id,
              },
              {
                unSeenByUserOne: true,
              },
            ],
          },
          {
            AND: [
              {
                userFriendId: input.id,
              },
              {
                unSeenByUseTwo: true,
              },
            ],
          },
        ],
      },
      data: {
        unSeenByUserOne: false,
        unSeenByUseTwo: false,
      },
    })
  })

export default editMessageShown
