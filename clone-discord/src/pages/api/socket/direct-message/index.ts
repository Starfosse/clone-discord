import { NextApiRequest } from "next"
import { currentUser } from "@clerk/nextjs"
import { prisma } from "@/lib/db"
import { getAuth } from "@clerk/nextjs/server"
import { NextApiResponseServerIo } from "@/lib/types"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  //   console.log("called")
  //   console.log(req)
  const { message } = req.body
  const { discussionId } = req.query
  console.log(typeof discussionId)
  console.log(discussionId, message)
  if (!discussionId) return
  console.log("test")
  //   const user = await currentUser()
  const { userId } = getAuth(req)
  console.log("test")
  if (!userId) return
  const user = await prisma.user.findFirst({
    where: { userId: userId },
  })
  const userFriend = await prisma.userFriend.findFirst({
    where: { id: discussionId as string },
  })
  console.log("test")
  if (!userFriend) return
  await prisma.userFriend.update({
    where: { id: discussionId as string },
    data: {
      lastMessage: new Date(),
      showConvUserOne: true,
      showConvUserTwo: true,
    },
  })
  console.log("test")
  let input
  if (userId === userFriend?.userOneId) {
    input = await prisma.inputChat.create({
      data: {
        message: message,
        sentByUserOne: true,
        unSeenByUseTwo: true,
        unSeenByUserOne: false,
        userFriendId: discussionId as string,
      },
    })
  } else {
    input = await prisma.inputChat.create({
      data: {
        message: message,
        sentByUserTwo: true,
        unSeenByUseTwo: false,
        unSeenByUserOne: true,
        userFriendId: discussionId as string,
      },
    })
  }
  console.log(input)
  //   console.log(message, discussionId)
  console.log(message)
  res?.socket?.server?.io?.emit("chat message", input)
  return res.status(200).json(input)
}
