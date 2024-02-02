import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const discussionProps = z.object({
  discussionId: z.string(),
  message: z.string(),
})

const addInputDiscussion = publicProcedure
  .input(discussionProps)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    if (!user) return
    const userId = await prisma.user.findFirst({
      where: { userId: user.id },
    })
    const userFriend = await prisma.userFriend.findFirst({
      where: { id: input.discussionId },
    })
    if (!userFriend) return
    const update = await prisma.userFriend.update({
      where: { id: input.discussionId },
      data: {
        lastMessage: new Date(),
        showConvUserOne: true,
        showConvUserTwo: true,
      },
    })
    if (userId?.id === userFriend?.userOneId) {
      return await prisma.inputChat.create({
        data: {
          message: input.message,
          sentByUserOne: true,
          userFriendId: input.discussionId,
        },
      })
    } else {
      return await prisma.inputChat.create({
        data: {
          message: input.message,
          sentByUserTwo: true,
          userFriendId: input.discussionId,
        },
      })
    }
  })

export default addInputDiscussion
