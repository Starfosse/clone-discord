import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { channel } from "diagnostics_channel"
import { z } from "zod"

const ChannelId = z.object({ id: z.string() })

const getRolesByChannel = publicProcedure
  .input(ChannelId)
  .query(async ({ input }) => {
    return await prisma.role.findMany({
      where: {
        channelRole: { some: { ChannelId: input.id } },
      },
    })
  })

export default getRolesByChannel
