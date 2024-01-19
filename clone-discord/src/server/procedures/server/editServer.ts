import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { ServerValidatorId } from "@/lib/validator/server-validator-id"

const editServer = publicProcedure
  .input(ServerValidatorId)
  .mutation(async ({ input }) => {
    const { imageUrl, name, id } = input
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
