import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const MemberIdChannelId = z.object({
  memberId: z.string(),
  channelId: z.string(),
})

const joinMemberToChannel = authentifiedProcedure
  .input(MemberIdChannelId)
  .mutation(async ({ input }) => {
    return await prisma.member.update({
      where: {
        id: input.memberId,
      },
      data: {
        channelId: input.channelId,
      },
    })
  })

export default joinMemberToChannel
