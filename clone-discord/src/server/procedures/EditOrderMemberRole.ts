import MemberRoleId from "@/lib/validator/member-role-validator"
import { publicProcedure } from "../trpc"
import { prisma } from "@/lib/db"
import { z } from "zod"

const MemberRoleArray = z.object({
  memberRoles: z.array(MemberRoleId),
})
const EditOrderMemberRole = publicProcedure
  .input(MemberRoleArray)
  .mutation(async ({ input }) => {
    const { memberRoles } = input
    const length = memberRoles.length
    for (let i = 0; i < length; i++) {
      let memberRole = memberRoles[i]
      const result = await prisma.memberRole.update({
        where: { id: memberRole.id },
        data: { orderServ: memberRole.orderServ },
      })
    }
  })

export default EditOrderMemberRole
