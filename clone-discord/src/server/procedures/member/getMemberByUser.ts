import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const channelId = z.object({ channelId: z.string() })

const getMemberByUser = publicProcedure
  .input(channelId)
  .query(async ({ input }) => {
    const user = await currentUser()
    const userMember = await prisma.user.findFirst({
      where: { userId: user?.id },
    })
    const server = await prisma.server.findFirst({
      where: {
        channels: {
          every: {
            id: input.channelId,
          },
        },
      },
    })
    return prisma.member.findFirst({
      where: {
        serverId: server?.id,
        userId: userMember?.id,
      },
    })
  })

export default getMemberByUser
