import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const userFriendId = z.object({ userFriendId: z.string() })

const editMessageShownBypage = publicProcedure
  .input(userFriendId)
  .mutation(async ({ input }) => {
    const userId = await currentUser()
    if (!userId) return
    const user = await prisma.user.findFirst({
      where: { userId: userId.id },
    })
    if (!user) return
    const userFriend = await prisma.userFriend.findFirst({
      where: {
        id: input.userFriendId,
      },
    })
    if (!userFriend) return
    if (userFriend.userOneId === user.id)
      return await prisma.inputChat.updateMany({
        where: { userFriendId: input.userFriendId },
        data: { unSeenByUserOne: false },
      })
    else if (userFriend.userTwoId === user.id)
      return await prisma.inputChat.updateMany({
        where: { userFriendId: input.userFriendId },
        data: { unSeenByUseTwo: false },
      })
  })

export default editMessageShownBypage
