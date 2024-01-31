import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const discussionId = z.object({
  discussionId: z.string(),
  cursor: z.string().nullish(),
})

const getInputChat = publicProcedure
  .input(discussionId)
  .query(async ({ input }) => {
    const limit = 15
    const { cursor } = input
    const items = await prisma.inputChat.findMany({
      take: limit + 1,
      where: {
        userFriendId: input.discussionId,
      },
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

export default getInputChat
