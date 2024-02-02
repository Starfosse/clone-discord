import { ServerValidator } from "@/lib/validator/server-validator"
import { publicProcedure } from "../../trpc"
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
    const { name } = input
    const { imageUrl } =
      input.imageUrl !== ""
        ? input
        : {
            imageUrl:
              "https://jbfj2hcv3mw8pv33.public.blob.vercel-storage.com/logo-discord-E0ZUFZla5jmR37FfQ7oGTEH7bycUKL.png",
          }
    console.log(imageUrl)
    const userOwner = await prisma.user.findFirst({
      where: {
        userId: user?.id,
      },
    })
    if (!userOwner) return
    const server = await prisma.server.create({
      data: {
        imageUrl: imageUrl!,
        name: name,
        inviteCode: uuidv4(),
        userId: user.id,
        members: {
          create: {
            userId: userOwner.id,
          },
        },
        roles: {
          create: [
            {
              role: "propriétaire",
              orderServ: 0,
            },
            {
              role: "membre",
              orderServ: 1,
            },
          ],
        },
      },
    })
    const rolesServer = await prisma.server.findFirst({
      where: { id: server.id },
      select: {
        roles: true,
      },
    })
    const ownerServer = await prisma.server.findFirst({
      where: { id: server.id },
      select: {
        members: true,
      },
    })
    if (!rolesServer) return
    const updatedServerChannels =
      await prisma.server.update({
        where: { id: server.id },
        data: {
          members: {
            update: {
              where: { id: ownerServer?.members[0].id },
              data: {
                role: {
                  create: [
                    {
                      RoleId: rolesServer.roles[0].id,
                    },
                    {
                      RoleId: rolesServer.roles[1].id,
                    },
                  ],
                },
              },
            },
          },
          channelGroups: {
            create: [
              {
                name: "SALONS TEXT",
                channels: {
                  create: [
                    {
                      name: "général",
                      serverId: server.id,
                    },
                  ],
                },
              },
              {
                name: "SALONS VOCAUX",
                channels: {
                  create: [
                    {
                      name: "Général",
                      serverId: server.id,
                    },
                  ],
                },
              },
            ],
          },
        },
      })
    return
  })

export default createServer
