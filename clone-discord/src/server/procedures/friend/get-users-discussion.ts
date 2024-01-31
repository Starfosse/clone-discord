import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const inputChatId = z.object({ id: z.string() })

const getUsersDiscussion = publicProcedure
  .input(inputChatId)
  .query(async ({ input }) => {
    const inputChat = await prisma.inputChat.findFirst({
      where: { id: input.id },
    })
    if (!inputChat) return
    const userFriend = await prisma.userFriend.findFirst({
      where: { id: inputChat.userFriendId },
    })
    if (!userFriend) return
    const userOne = await prisma.user.findFirst({
      where: { id: userFriend.userOneId },
    })
    const userTwo = await prisma.user.findFirst({
      where: { id: userFriend.userTwoId },
    })
    if (!userOne || !userTwo) return
    return { userOne, userTwo }
  })

export default getUsersDiscussion