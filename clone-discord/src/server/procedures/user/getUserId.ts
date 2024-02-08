import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"

const getUserId = authentifiedProcedure.query(async () => {
  const user = await currentUser()
  return await prisma.user.findFirst({
    where: {
      userId: user?.id,
    },
    select: { id: true },
  })
})

export default getUserId
