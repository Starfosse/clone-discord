import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const MemberId = z.object({ id: z.string() })

const getListRoleByMember = publicProcedure
  .input(MemberId)
  .query(async ({ input }) => {
    const memberRoles = await prisma.member.findFirst({
      where: { id: input.id },
      include: { role: true },
    })

    if (!memberRoles) return

    let res = []
    for (let i = 0; i < memberRoles?.role.length; i++) {
      const role = await prisma.role.findFirst({
        where: { id: memberRoles.role[i].RoleId },
      })
      if (!role) return
      res.push(role)
    }
    if (!res) return
    return res
  })

export default getListRoleByMember
