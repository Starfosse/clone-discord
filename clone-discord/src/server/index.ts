import { prisma } from "@/lib/db"
import { router, publicProcedure } from "./trpc"
import { currentUser } from "@clerk/nextjs"
import { ProfileValidator } from "@/lib/validator/profile-validator"
import { ServerValidator } from "@/lib/validator/server-validator"
import { NextResponse } from "next/server"

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
      const userToUpdate = await prisma.user.findFirst({
        where: {
          userId: user?.id,
        },
      })
      console.log("ok02")
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
  createServer: publicProcedure
    .input(ServerValidator)
    .mutation(async ({ input }) => {
      const user = await currentUser()
      if (!user) {
        return new NextResponse("Unauthorized", {
          status: 401,
        })
      }
      const { imageUrl, name } = input
      const userOwner = await prisma.user.findFirst({
        where: {
          userId: user?.id,
        },
      })
      return await prisma.server.create({
        data: {
          imageUrl: imageUrl,
          name: name,
          inviteCode: "alloa",
          userId: user.id,
        },
      })
    }),
})

export type AppRouter = typeof appRouter
