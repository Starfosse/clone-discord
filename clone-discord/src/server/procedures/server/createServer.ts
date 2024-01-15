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
        members: {
          create: {
            userId: user.id,
          },
        },
        memberRoles: {
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
    const memberRolesServer = await prisma.server.findFirst(
      {
        where: { id: server.id },
        select: {
          memberRoles: true,
        },
      }
    )
    const ownerServer = await prisma.server.findFirst({
      where: { id: server.id },
      select: {
        members: true,
      },
    })

    const updatedServerChannels =
      await prisma.server.update({
        where: { id: server.id },
        data: {
          members: {
            update: {
              where: {
                id: ownerServer?.members[0].id,
              },
              data: {
                role: {
                  connect: [
                    {
                      id: memberRolesServer?.memberRoles[0]
                        .id,
                    },
                    {
                      id: memberRolesServer?.memberRoles[1]
                        .id,
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
                roleRequired: {
                  connect: {
                    id: memberRolesServer?.memberRoles[1]
                      .id,
                  },
                },
                channels: {
                  create: [
                    {
                      name: "général",
                      serverId: server.id,
                      roleRequired: {
                        connect: [
                          {
                            id: memberRolesServer
                              ?.memberRoles[1].id,
                          },
                        ],
                      },
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
                      roleRequired: {
                        connect: [
                          {
                            id: memberRolesServer
                              ?.memberRoles[1].id,
                          },
                        ],
                      },
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
