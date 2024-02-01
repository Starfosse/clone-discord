import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { string, z } from "zod"

const userOneId = z.object({ id: z.string() })

const validFriendDemand = publicProcedure
  .input(userOneId)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    if (!user) return
    const userTwoId = await prisma.user.findFirst({
      where: { userId: user.id },
      select: {
        id: true,
      },
    })
    if (!userTwoId) return
    return await prisma.userFriend.update({
      where: {
        userOneId_userTwoId: {
          userOneId: input.id,
          userTwoId: userTwoId.id,
        },
      },
      data: {
        pending: false,
      },
    })
  })

export default validFriendDemand
