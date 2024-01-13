import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../trpc"
import { prisma } from "@/lib/db"
import { CategoryValidator } from "@/lib/validator/category-validator"

const createcategory = publicProcedure
  .input(CategoryValidator)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    return await prisma.server.update({
      where: {
        id: input.id,
      },
      data: {
        channelGroups: {
          create: {
            name: input.name,
          },
        },
      },
    })
  })

export default createcategory
