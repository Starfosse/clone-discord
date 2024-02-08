import { prisma } from "@/lib/db"
import { inputContent } from "@/lib/validator/input-content-validator"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const addInputChannel = authentifiedProcedure
  .input(inputContent)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    const userToAdd = await prisma.user.findFirst({
      where: { userId: user!.id },
    })
    return await prisma.inputChannel.create({
      data: {
        message: input.message,
        channelId: input.id,
        userId: userToAdd!.id,
      },
    })
  })

export default addInputChannel
