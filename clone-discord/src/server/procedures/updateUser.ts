import { ProfileValidator } from "@/lib/validator/profile-validator"
import { publicProcedure } from "../trpc"
import { currentUser } from "@clerk/nextjs"
import { prisma } from "@/lib/db"

const updateUser = publicProcedure
  .input(ProfileValidator)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    const { imageUrl, pseudo, state } = input
    const userToUpdate = await prisma.user.findFirst({
      where: {
        userId: user?.id,
      },
    })
    return await prisma.user.update({
      where: {
        userId: user?.id,
      },
      data: {
        imageUrl: imageUrl,
        pseudo: pseudo,
        state: state,
      },
    })
  })

export default updateUser
