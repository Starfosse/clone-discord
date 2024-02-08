import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const inputChatId = z.object({ id: z.string() })

const deleteInputChat = authentifiedProcedure
  .input(inputChatId)
  .mutation(async ({ input }) => {
    return await prisma.inputChat.delete({
      where: { id: input.id },
    })
  })

export default deleteInputChat
