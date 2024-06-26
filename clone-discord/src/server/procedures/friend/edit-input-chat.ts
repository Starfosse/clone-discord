import { prisma } from "@/lib/db"
import { editInputChatId } from "@/lib/validator/edit-input-chat"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const editInputChat = authentifiedProcedure
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
