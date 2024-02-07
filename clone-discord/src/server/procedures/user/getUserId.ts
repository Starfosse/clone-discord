import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"

const getUserId = publicProcedure.query(async () => {
  const user = await currentUser()
  return await prisma.user.findFirst({
    where: {
      userId: user?.id,
    },
    select: { id: true },
  })
})

export default getUserId
