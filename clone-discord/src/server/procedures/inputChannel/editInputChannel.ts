import { prisma } from "@/lib/db"
import { inputChannelValidator } from "@/lib/validator/edit-input-channel-validator"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const editInputChannel = publicProcedure
  .input(inputChannelValidator)
  .mutation(async ({ input }) => {
    return await prisma.inputChannel.update({
      where: { id: input.id },
      data: {
        message: input.message,
      },
    })
  })

export default editInputChannel
