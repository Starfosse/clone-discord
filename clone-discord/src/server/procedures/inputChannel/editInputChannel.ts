import { prisma } from "@/lib/db"
import { inputChannelValidator } from "@/lib/validator/edit-input-channel-validator"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const editInputChannel = authentifiedProcedure
  .input(inputChannelValidator)
  .mutation(async ({ input }) => {
    return await prisma.inputChannel.update({
      where: { id: input.id },
      data: {
        message: input.message,
        isEdit: true,
      },
    })
  })

export default editInputChannel
