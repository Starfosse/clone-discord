import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"

const pendingInvitationFriend = authentifiedProcedure.query(
  async () => {
    const userId = await currentUser()
    if (!userId) return
    const user = await prisma.user.findFirst({
      where: { userId: userId.id },
      select: { id: true },
    })
    if (!user) return
    const pendingList = await prisma.userFriend.findMany({
      where: {
        AND: [{ userTwoId: user.id }, { pending: true }],
      },
      select: {
        userOneId: true,
      },
    })
    let userOneList = []
    for (let i = 0; i < pendingList.length; i++) {
      const userFind = await prisma.user.findFirst({
        where: { id: pendingList[i].userOneId },
      })
      if (!userFind) return
      userOneList.push(userFind)
    }
    if (!userOneList) return
    return userOneList
  }
)

export default pendingInvitationFriend
