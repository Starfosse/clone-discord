import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { create } from "domain"
import { z } from "zod"

const MemberData = z.object({ serverId: z.string() })

const createMember = publicProcedure
  .input(MemberData)
  .mutation(async ({ input }) => {
    const userId = await currentUser()
    if (!userId) return
    const user = await prisma.user.findFirst({
      where: { userId: userId.id },
    })
    if (!user) return
    return await prisma.member.create({
      data: {
        serverId: input.serverId,
        userId: user.id,
      },
    })
  })

export default createMember
