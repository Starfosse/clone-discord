import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const channelId = z.object({
  id: z.string(),
  gif: z.string(),
})
const addGifInputChannel = authentifiedProcedure
  .input(channelId)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    const userId = await prisma.user.findFirst({
      where: { userId: user?.id },
    })
    if (!userId) return
    return await prisma.inputChannel.create({
      data: {
        channelId: input.id,
        isGif: true,
        message: input.gif,
        userId: userId?.id,
      },
    })
  })

export default addGifInputChannel
