import { z } from "zod"
import { publicProcedure } from "../trpc"
import { prisma } from "@/lib/db"

const MemberRoleId = z.object({
  MemberRoleId: z.string(),
})

const GetMemberRole = publicProcedure
  .input(MemberRoleId)
  .query(async ({ input }) => {
    const { MemberRoleId } = input
    return await prisma.memberRole.findUnique({
      where: {
        id: input.MemberRoleId,
      },
    })
  })

export default GetMemberRole
