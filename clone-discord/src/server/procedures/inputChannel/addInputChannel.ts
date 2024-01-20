import { prisma } from "@/lib/db"
import { inputContent } from "@/lib/validator/input-content-validator"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const addInputChannel = publicProcedure
  .input(inputContent)
  .mutation(async ({ input }) => {
    return await prisma.inputChannel.create({
      data: {
        message: input.message,
        channelId: input.id,
      },
    })
  })

export default addInputChannel
