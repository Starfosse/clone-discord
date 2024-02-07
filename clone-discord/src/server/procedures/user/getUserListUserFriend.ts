import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"

const getUserListUserFriends = publicProcedure.query(
  async () => {
    const userId = await currentUser()
    if (!userId) return
    const user = await prisma.user.findFirst({
      where: { userId: userId.id },
    })
    if (!user) return
    const friendsList = await prisma.userFriend.findMany({
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
    })
    if (!friendsList) return
    const friendsListId = friendsList.map((friend) => {
      return friend.userOneId === user.id
        ? friend.userTwoId
        : friend.userOneId
    })
    let friendsUserList = []
    for (let i = 0; i < friendsListId.length; i++) {
      const onlineFriend = await prisma.user.findFirst({
        where: { id: friendsListId[i] },
      })
      if (!onlineFriend) return
      friendsUserList.push(onlineFriend)
    }
    if (!friendsUserList) return
    return { friendsUserList }
  }
)

export default getUserListUserFriends
