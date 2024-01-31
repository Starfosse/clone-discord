import { prisma } from "@/lib/db"
import { editInputChatId } from "@/lib/validator/edit-input-chat"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const editInputChat = publicProcedure
  .input(editInputChatId)
  .mutation(async ({ input }) => {
    return await prisma.inputChat.update({
      where: {
        id: input.id,
      },
      data: {
        isEdit: true,
        message: input.messsageEdited,
      },
    })
  })

export default editInputChat
