import { currentUser } from "@clerk/nextjs"
import { prisma } from "./db"

export const createNewUser = async () => {
  const user = await currentUser()
  console.log(user)

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
        ImageUrl: "",
      },
    })
  }
}
