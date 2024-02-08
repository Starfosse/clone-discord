import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const discussionId = z.object({ id: z.string() })

const unshowDiscussion = authentifiedProcedure
  .input(discussionId)
  .mutation(async ({ input }) => {
    const userId = await currentUser()
    if (!userId) return
    const user = await prisma.user.findFirst({
      where: { userId: userId.id },
    })
    if (!user) return
    const userFriend = await prisma.userFriend.findFirst({
      where: { id: input.id },
    })
    if (!userFriend) return
    if (userFriend.userOneId === user.id)
      return await prisma.userFriend.update({
        where: { id: input.id },
        data: { showConvUserOne: false },
      })
    else
      return await prisma.userFriend.update({
        where: { id: input.id },
        data: {
          showConvUserTwo: false,
        },
      })
  })

export default unshowDiscussion
