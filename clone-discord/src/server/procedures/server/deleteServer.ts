import { publicProcedure } from "../../trpc"
import { currentUser } from "@clerk/nextjs"
import { prisma } from "@/lib/db"
import { z } from "zod"

const ServerId = z.object({ id: z.string() })

const deleteServer = publicProcedure
  .input(ServerId)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    const userToUpdate = await prisma.user.findFirst({
      where: {
        userId: user?.id,
      },
    })
    return await prisma.server.delete({
      where: {
        id: input.id,
      },
    })
  })

export default deleteServer
