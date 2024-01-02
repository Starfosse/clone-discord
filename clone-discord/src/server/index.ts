import { prisma } from "@/lib/db"
import { router, publicProcedure } from "./trpc"
import { currentUser } from "@clerk/nextjs"
import { ProfileValidator } from "@/lib/validator/profile-validator"

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [10, 20, 30]
  }),
  getUser: publicProcedure.query(async () => {
    const user = await currentUser()
    return await prisma.user.findFirst({
      where: {
        userId: user?.id,
      },
    })
  }),
  updateUser: publicProcedure
    .input(ProfileValidator)
    .mutation(async ({ input }) => {
      const user = await currentUser()
      const { imageUrl, pseudo, state } = input
      console.log("state ===")
      console.log(state)
      console.log("state ===")
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
      return
    }),
})

export type AppRouter = typeof appRouter
