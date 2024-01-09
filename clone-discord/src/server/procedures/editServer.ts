import { publicProcedure } from "../trpc"
import { currentUser } from "@clerk/nextjs"
import { prisma } from "@/lib/db"
import { ServerValidatorId } from "@/lib/validator/server-validator-id"

const editServer = publicProcedure
  .input(ServerValidatorId)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    const { imageUrl, name, id } = input
    const userToUpdate = await prisma.user.findFirst({
      where: {
        userId: user?.id,
      },
    })
    return await prisma.server.update({
      where: {
        id: id,
      },
      data: {
        imageUrl: imageUrl,
        name: name,
      },
    })
  })

export default editServer
