import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const InvitationServer = z.object({
  serverId: z.string(),
  userFriendId: z.string(),
})

const sendInvitationServer = publicProcedure
  .input(InvitationServer)
  .mutation(async ({ input }) => {
    const userId = await currentUser()
    if (!userId) return
    const user = await prisma.user.findFirst({
      where: { userId: userId.id },
    })
    if (!user) return
    const userFriend = await prisma.userFriend.findFirst({
      where: { id: input.userFriendId },
    })
    if (!userFriend) return
    if (user.id === userFriend.userOneId) {
      const res = await prisma.inputChat.create({
        data: {
          userFriendId: input.userFriendId,
          isInvitationServer: true,
          sentByUserOne: true,
          unSeenByUseTwo: true,
          message: input.serverId,
        },
      })
    } else {
      const res = await prisma.inputChat.create({
        data: {
          userFriendId: input.userFriendId,
          isInvitationServer: true,
          sentByUserTwo: true,
          unSeenByUserOne: true,
          message: input.serverId,
        },
      })
    }
    return
  })

export default sendInvitationServer
