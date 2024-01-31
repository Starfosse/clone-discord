import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const inputChatId = z.object({ id: z.string() })

const deleteInputChat = publicProcedure
  .input(inputChatId)
  .mutation(async ({ input }) => {
    return await prisma.inputChat.delete({
      where: { id: input.id },
    })
  })

export default deleteInputChat
