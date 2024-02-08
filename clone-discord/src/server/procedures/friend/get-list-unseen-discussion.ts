import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"

const getListUnseenDiscussion = authentifiedProcedure.query(
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
    if (!userFriendList) return

    let listUnSeenConv = []
    let listFriend = []
    for (let i = 0; i < userFriendList.length; i++) {
      let unSeenConv = []
      let friend
      for (
        let j = 0;
        j < userFriendList[i].discussion.length;
        j++
      ) {
        if (
          userFriendList[i].discussion[j].unSeenByUseTwo &&
          userFriendList[i].userTwoId === user.id
        ) {
          unSeenConv.push(userFriendList[i].discussion[j])
          friend = userFriendList[i].userOneId
        } else if (
          userFriendList[i].discussion[j].unSeenByUserOne &&
          userFriendList[i].userOneId === user.id
        ) {
          unSeenConv.push(userFriendList[i].discussion[j])
          friend = userFriendList[i].userTwoId
        }
      }
      if (!unSeenConv || !friend) return
      listUnSeenConv.push(unSeenConv)
      listFriend.push(friend)
    }
    if (!listUnSeenConv || !listFriend) return
    const listFriendData = []
    for (let i = 0; i < listFriend.length; i++) {
      const friendData = await prisma.user.findFirst({
        where: { id: listFriend[i] },
      })
      if (!friendData) return
      listFriendData.push(friendData)
    }
    if (!listFriendData) return
    return {
      listUnSeenConv,
      listFriendData,
      userFriendList,
    }
  }
)

export default getListUnseenDiscussion
