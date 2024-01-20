import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const ChannelId = z.object({ id: z.string() })

const getInputChannel = publicProcedure
  .input(ChannelId)
  .query(async ({ input }) => {
    return await prisma.inputChannel.findMany({
      where: { channelId: input.id },
      orderBy: { createdAt: "asc" },
    })
  })
