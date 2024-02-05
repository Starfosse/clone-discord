import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const MemberId = z.object({ id: z.string() })

const expelMember = publicProcedure
  .input(MemberId)
  .mutation(async ({ input }) => {
    const userId = await currentUser()
    if (!userId) return
    const user = await prisma.user.findFirst({
      where: { userId: userId.id },
    })
    const memberToDelete = await prisma.member.findFirst({
      where: { id: input.id },
    })
    if (memberToDelete?.userId === user?.id) return
    return await prisma.member.delete({
      where: { id: input.id },
    })
  })

export default expelMember
