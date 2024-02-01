import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const userId = z.object({
  id: z.string(),
  imageUrl: z.string(),
})

const editImage = publicProcedure
  .input(userId)
  .mutation(async ({ input }) => {
    return await prisma.user.update({
      where: { id: input.id },
      data: {
        imageUrl: input.imageUrl,
      },
    })
  })

export default editImage
