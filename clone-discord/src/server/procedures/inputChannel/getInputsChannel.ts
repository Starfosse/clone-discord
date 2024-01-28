import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"
//@ts-ignore

// const ChannelId = z.object({
//   id: z.string(),
// })

const getInputChannel = publicProcedure
  .input(
    z.object({
      channelId: z.string(),
      cursor: z.string().nullish(),
    })
  )
  .query(async ({ input }) => {
    const limit = 4
    const { cursor } = input
    console.log(cursor)
    const items = await prisma.inputChannel.findMany({
      take: limit + 1,
      where: { channelId: input.channelId },
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "asc" }, //createdAt
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
