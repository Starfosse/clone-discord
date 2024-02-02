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
    const userFriendListNotNull = userFriendList.filter(
      (userFriend) => userFriend.discussion
    )
    const userFriendListShowable =
      userFriendListNotNull.filter(
        (userFriend) =>
          (userFriend.userOneId === user.id &&
            userFriend.showConvUserOne) ||
          (userFriend.userTwoId === user.id &&
            userFriend.showConvUserTwo)
      )
    const listFriends = []
    for (
      let i = 0;
      i < userFriendListShowable.length;
      i++
    ) {
      const friend =
        user.id === userFriendListShowable[i].userOneId
          ? await prisma.user.findFirst({
              where: {
                id: userFriendListShowable[i].userTwoId,
              },
            })
          : await prisma.user.findFirst({
              where: {
                id: userFriendListShowable[i].userOneId,
              },
            })
      if (!friend) return
      listFriends.push(friend)
    }
    if (!listFriends) return
    return { userFriendListShowable, listFriends }
  }
)

export default getListDiscussion
