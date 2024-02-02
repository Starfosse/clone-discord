import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const MemberId = z.object({ id: z.string() })

const getListRoleByMember = publicProcedure
  .input(MemberId)
  .query(async ({ input }) => {
    console.log("test")
    console.log(input.id)
    const memberRoles = await prisma.member.findFirst({
      where: { id: input.id },
      include: { role: true },
    })
    console.log("test")
    console.log(memberRoles)
    if (!memberRoles) return
    console.log("test")
    let res = []
    for (let i = 0; i < memberRoles?.role.length; i++) {
      const role = await prisma.role.findFirst({
        where: { id: memberRoles.role[i].RoleId },
      })
      console.log(role)
      if (!role) return
      res.push(role)
    }
    console.log(res)
    if (!res) return
    return res
  })

export default getListRoleByMember
