import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { CategoryValidator } from "@/lib/validator/category-validator"
import { z } from "zod"

const categoryId = z.object({
  id: z.string(),
})

const deleteCategory = publicProcedure
  .input(categoryId)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    return await prisma.channelGroup.delete({
      where: {
        id: input.id,
      },
    })
  })

export default deleteCategory
