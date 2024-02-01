import { currentUser } from "@clerk/nextjs"
import { prisma } from "../../../lib/db"
import { publicProcedure } from "@/server/trpc"

export const createNewUser = publicProcedure.mutation(
  async () => {
    const user = await currentUser()

    const match = await prisma.user.findUnique({
      where: {
        userId: user?.id,
      },
    })

    if (!match && user && user.username) {
      await prisma.user.create({
        data: {
          userId: user.id,
          pseudo: user.username,
          imageUrl:
            "https://jbfj2hcv3mw8pv33.public.blob.vercel-storage.com/logo-discord-icone-png-2-ac4mdWmeYGRr80YhUL0nhcHOTQVh7U.png",
        },
      })
    }
  }
)

export default createNewUser
