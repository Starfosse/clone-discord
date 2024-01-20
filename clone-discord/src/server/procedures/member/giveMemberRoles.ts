import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

export const giveMemberRoleValidator = z.object({
  id: z.string(),
  RoleId: z.array(z.string()),
})

export type TGiveMemberRoleValidator = z.infer<
  typeof giveMemberRoleValidator
>

const giveMemberRoles = publicProcedure
  .input(giveMemberRoleValidator)
  .mutation(async ({ input }) => {
    const res = await prisma.memberRole.deleteMany({
      where: { MemberId: input.id },
    })
    for (let i = 0; i < input.RoleId.length; i++) {
      const res2 = await prisma.memberRole.create({
        data: {
          MemberId: input.id,
          RoleId: input.RoleId[i],
        },
      })
    }
  })

export default giveMemberRoles
