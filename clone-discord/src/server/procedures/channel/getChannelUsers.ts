import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const channelId = z.object({ id: z.string() })

const getChannelUsers = authentifiedProcedure
  .input(channelId)
  .query(async ({ input }) => {
    const members = await prisma.member.findMany({
      where: { channelId: input.id },
    })
    let userMember = []
    for (let i = 0; i < members.length; i++) {
      const user = await prisma.user.findFirst({
        where: {
          members: {
            every: {
              id: members[i].id,
            },
          },
        },
      })
      if (user) userMember.push(user)
    }
    return userMember
  })

export default getChannelUsers
