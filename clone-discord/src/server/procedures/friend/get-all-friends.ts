import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const user = z.object({ id: z.string() })

const getAllFriends = publicProcedure
  .input(user)
  .query(async ({ input }) => {
    const userFriendList = await prisma.userFriend.findMany(
      {
        where: {
          OR: [
            { userTwoId: input.id },
            { userOneId: input.id },
          ],
          AND: [{ pending: false }],
        },
        select: {
          userOneId: true,
          userTwoId: true,
          id: true,
        },
      }
    )
    const friendsListId = userFriendList.map((friend) => {
      return friend.userOneId === input.id
        ? friend.userTwoId
        : friend.userOneId
    })
    let friendsList = []
    let userFriendListId = []
    for (let i = 0; i < friendsListId.length; i++) {
      const onlineFriend = await prisma.user.findFirst({
        where: { id: friendsListId[i] },
      })
      if (!onlineFriend) return
      userFriendListId.push(userFriendList[i].id)
      friendsList.push(onlineFriend)
    }
    return { friendsList, userFriendListId }
  })

export default getAllFriends
