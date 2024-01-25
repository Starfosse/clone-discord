import { publicProcedure } from "../../trpc"
import { currentUser } from "@clerk/nextjs"
import { prisma } from "@/lib/db"

const getUserListServ = publicProcedure.query(async () => {
  const user = await currentUser()
  const userId = await prisma.user.findFirst({
    where: { userId: user?.id },
    select: { id: true },
  })
  const userListServer = await prisma.member.findMany({
    where: {
      userId: userId!.id,
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
})

export default getUserListServ
