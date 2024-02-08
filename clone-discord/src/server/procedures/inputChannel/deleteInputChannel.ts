import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const InputChannelId = z.object({ id: z.string() })
const deleteInputChannel = authentifiedProcedure
  .input(InputChannelId)
  .mutation(async ({ input }) => {
    return await prisma.inputChannel.delete({
      where: { id: input.id },
    })
  })

export default deleteInputChannel
