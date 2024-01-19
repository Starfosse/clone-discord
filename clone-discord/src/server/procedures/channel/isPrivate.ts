import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { channel } from "diagnostics_channel"
import { z } from "zod"

const ChannelId = z.object({ id: z.string() })

const isPrivate = publicProcedure
  .input(ChannelId)
  .query(async ({ input }) => {
    return await prisma.channel.findFirst({
      where: {
        id: input.id,
      },
      select: { isPrivate: true },
    })
  })

export default isPrivate
