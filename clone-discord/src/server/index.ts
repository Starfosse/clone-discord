import { prisma } from "@/lib/db"
import { router, publicProcedure } from "./trpc"
import { currentUser } from "@clerk/nextjs"

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
})

export type AppRouter = typeof appRouter
