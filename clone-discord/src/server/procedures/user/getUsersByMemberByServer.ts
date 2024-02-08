import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { User } from "@prisma/client"
import { z } from "zod"

const ServerId = z.object({ id: z.string() })

const getUsersByMemberByServer = authentifiedProcedure
  .input(ServerId)
  .query(async ({ input }) => {
    const members = await prisma.member.findMany({
      where: { serverId: input.id },
    })
    let listUserServer = []
    for (let i = 0; i < members.length; i++) {
      const usersServer = await prisma.user.findFirst({
        where: { id: members[i].userId },
      })
      if (!usersServer) return
      listUserServer.push(usersServer)
    }
    if (typeof listUserServer !== null)
      return listUserServer
  })

export default getUsersByMemberByServer
