import { publicProcedure } from "../../trpc"
import { currentUser } from "@clerk/nextjs"
import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"

const getUserListServ = authentifiedProcedure.query(
  async () => {
    const userId = await currentUser()
    if (!userId) return
    const user = await prisma.user.findFirst({
      where: { userId: userId.id },
    })
    if (!user) return
    const userListServer = await prisma.member.findMany({
      where: {
        userId: user.id,
      },
      select: {
        serverId: true,
      },
    })
    const userListServerId = userListServer.map(
      (server) => server.serverId
    )
    const servers = await prisma.server.findMany({
      where: {
        id: {
          in: userListServerId,
        },
      },
    })
    return servers
  }
)

export default getUserListServ
