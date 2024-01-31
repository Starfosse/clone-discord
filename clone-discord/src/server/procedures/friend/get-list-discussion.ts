import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { UserFriend } from "@prisma/client"

const getListDiscussion = publicProcedure.query(
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
        orderBy: { lastMessage: "asc" },
        include: { discussion: true },
      }
    )
    userFriendList.filter(
      (userFriend) => userFriend.discussion
    )
    if (!userFriendList) return
    const listDiscussion = []
    const listFriends = []
    for (let i = 0; i < userFriendList.length; i++) {
      const friend =
        user.id === userFriendList[i].userOneId
          ? await prisma.user.findFirst({
              where: { id: userFriendList[i].userTwoId },
            })
          : await prisma.user.findFirst({
              where: { id: userFriendList[i].userOneId },
            })
      if (!friend) return
      listFriends.push(friend)
    }
    if (!listFriends) return
    return { userFriendList, listFriends }
  }
)

export default getListDiscussion
