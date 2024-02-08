import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { CategoryValidator } from "@/lib/validator/category-validator"
import { authentifiedProcedure } from "@/server/middlewares/authentified"

const editCategory = authentifiedProcedure
  .input(CategoryValidator)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    return await prisma.channelGroup.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
      },
    })
  })

export default editCategory
