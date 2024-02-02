import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const InputChannelId = z.object({ id: z.string() })
const deleteInputChannel = publicProcedure
  .input(InputChannelId)
  .mutation(async ({ input }) => {
    return await prisma.inputChannel.delete({
      where: { id: input.id },
    })
  })

export default deleteInputChannel
