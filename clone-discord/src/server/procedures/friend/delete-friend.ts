import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const UserFriendId = z.object({ id: z.string() })

const deleteFriend = authentifiedProcedure
  .input(UserFriendId)
  .mutation(async ({ input }) => {
    return await prisma.userFriend.delete({
      where: { id: input.id },
    })
  })

export default deleteFriend
