import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const userFriendId = z.object({ userFriendId: z.string() })

const getFriendDiscussion = authentifiedProcedure
  .input(userFriendId)
  .query(async ({ input }) => {
    const user = await currentUser()
    if (!user) return
    const userId = await prisma.user.findFirst({
      where: { userId: user.id },
    })
    if (!userId) return
    const discussion = await prisma.userFriend.findFirst({
      where: {
        id: input.userFriendId,
      },
    })
    if (!discussion) return
    const friend =
      discussion.userOneId !== userId.id
        ? discussion.userOneId
        : discussion.userTwoId
    return await prisma.user.findFirst({
      where: { id: friend },
    })
  })

export default getFriendDiscussion
