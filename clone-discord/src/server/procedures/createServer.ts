import { ServerValidator } from "@/lib/validator/server-validator"
import { publicProcedure } from "../trpc"
import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"
import { MemberRole } from "@prisma/client"

const createServer = publicProcedure
  .input(ServerValidator)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    if (!user) {
      return new NextResponse("Unauthorized", {
        status: 401,
      })
    }
    const { imageUrl, name } = input
    const userOwner = await prisma.user.findFirst({
      where: {
        userId: user?.id,
      },
    })
    const server = await prisma.server.create({
      data: {
        imageUrl: imageUrl!,
        name: name,
        inviteCode: uuidv4(),
        userId: user.id,
        channels: {
          create: [
            {
              name: "general",
              type: "TEXT",
              userId: user.id,
            },
            {
              name: "general",
              type: "AUDIO",
              userId: user.id,
            },
          ],
        },
        members: {
          create: [
            {
              userId: user.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    })
    return
  })

export default createServer
