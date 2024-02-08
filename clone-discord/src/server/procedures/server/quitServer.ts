import { publicProcedure } from "../../trpc"
import { currentUser } from "@clerk/nextjs"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { authentifiedProcedure } from "@/server/middlewares/authentified"

const ServerId = z.object({ id: z.string() })

const quitServer = authentifiedProcedure
  .input(ServerId)
  .mutation(async ({ input }) => {
    console.log(input.id)
    const userId = await currentUser()
    if (!userId) return
    const user = await prisma.user.findFirst({
      where: { userId: userId.id },
    })
    if (!user) return
    const member = await prisma.member.findFirst({
      where: {
        AND: [{ serverId: input.id }, { userId: user.id }],
      },
    })
    if (!member) return
    return await prisma.member.delete({
      where: { id: member.id },
    })
  })

export default quitServer
