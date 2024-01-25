import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const MemberIdChannelId = z.object({
  memberId: z.string(),
  channelId: z.string(),
})

const joinMemberToChannel = publicProcedure
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
