import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const pseudo = z.object({
  pseudo: z.string(),
  id: z.string(),
})

const addFriend = authentifiedProcedure
  .input(pseudo)
  .mutation(async ({ input }) => {
    const userToAdd = await prisma.user.findFirst({
      where: { pseudo: input.pseudo },
      select: { id: true },
    })
    if (!userToAdd) return
    return await prisma.userFriend.create({
      data: {
        userOneId: input.id,
        userTwoId: userToAdd.id,
      },
    })
  })

export default addFriend
