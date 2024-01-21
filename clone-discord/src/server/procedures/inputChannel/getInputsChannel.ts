import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"
//@ts-ignore

const ChannelId = z.object({
  id: z.string(),
})

const getInputChannel = publicProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.number().nullish(),
      id: z.string(),
    })
  )
  .query(async ({ input }) => {
    const user = currentUser()
    const limit = input.limit ?? 50
    const cursor = input.cursor
    const items = await prisma.inputChannel.findMany({
      take: limit + 1,
      where: { channelId: input.id },
      //@ts-ignore
      cursor: cursor ? { myCursor: cursor } : undefined,
      orderBy: { createdAt: "asc" },
    })
    let nextCursor: typeof cursor | undefined = undefined
    if (items.length > limit) {
      const nextItem = items.pop()
      //@ts-ignore
      nextCursor = nextItem!.myCursor
    }
    return {
      items,
      nextCursor,
    }
  })

export default getInputChannel