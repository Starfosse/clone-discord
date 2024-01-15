import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"

const getUser = publicProcedure.query(async () => {
  const user = await currentUser()
  return await prisma.user.findFirst({
    where: {
      userId: user?.id,
    },
  })
})

export default getUser
