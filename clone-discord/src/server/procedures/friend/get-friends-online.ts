import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { stateList } from "@prisma/client"
import { z } from "zod"

const user = z.object({ id: z.string() })

const getFriendsOnline = publicProcedure
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

    const friendsList = userFriendList.map((friend) => {
      return friend.userOneId === input.id
        ? friend.userTwoId
        : friend.userOneId
    })

    let onlineFriendsList = []
    let userFriendListId = []
    for (let i = 0; i < friendsList.length; i++) {
      const onlineFriend = await prisma.user.findFirst({
        where: { id: friendsList[i] },
      })
      if (
        onlineFriend?.state === stateList.OFFLINE ||
        !onlineFriend
      )
        return
      onlineFriendsList.push(onlineFriend)
      userFriendListId.push(userFriendList[i].id)
    }
    return { onlineFriendsList, userFriendListId }
  })

export default getFriendsOnline
