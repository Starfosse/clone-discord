import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const getInputChannel = publicProcedure
  .input(
    z.object({
      channelId: z.string(),
      cursor: z.string().nullish(),
    })
  )
  .query(async ({ input }) => {
    const limit = 15
    const { cursor } = input
    const items = await prisma.inputChannel.findMany({
      take: limit + 1,
      where: { channelId: input.channelId },
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    })
    let nextCursor: typeof cursor | undefined = undefined
    if (items.length > limit) {
      const nextItem = items.pop()
      nextCursor = nextItem!.id
    }
    return {
      items,
      nextCursor,
    }
  })

export default getInputChannel
