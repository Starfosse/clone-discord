import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const pseudo = z.object({ pseudo: z.string() })

const addFriend = publicProcedure
  .input(pseudo)
  .mutation(async ({ input }) => {
    const userId = await currentUser()
    const user = await prisma.user.findFirst({
      where: { userId: userId?.id },
      select: { id: true },
    })
    const userToAdd = await prisma.user.findFirst({
      where: { pseudo: input.pseudo },
      select: { id: true },
    })
    if (!user || !userToAdd) return
    return await prisma.userFriend.create({
      data: {
        userOneId: user.id,
        userTwoId: userToAdd.id,
      },
    })
  })

export default addFriend
