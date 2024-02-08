import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"

const getUserListUserFriends = authentifiedProcedure.query(
  async () => {
    const userId = await currentUser()
    if (!userId) return
    const user = await prisma.user.findFirst({
      where: { userId: userId.id },
    })
    if (!user) return
    const userFriendList = await prisma.userFriend.findMany(
      {
        where: {
          OR: [
            { userTwoId: user.id },
            { userOneId: user.id },
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
      return friend.userOneId === user.id
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
  }
)

export default getUserListUserFriends
