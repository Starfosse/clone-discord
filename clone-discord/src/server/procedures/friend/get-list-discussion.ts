import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const user = z.object({ id: z.string() })

const getListDiscussion = publicProcedure
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
          (userFriend.userOneId === input.id &&
            userFriend.showConvUserOne) ||
          (userFriend.userTwoId === input.id &&
            userFriend.showConvUserTwo)
      )
    const listFriends = []
    for (
      let i = 0;
      i < userFriendListShowable.length;
      i++
    ) {
      const friend =
        input.id === userFriendListShowable[i].userOneId
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
  })

export default getListDiscussion
