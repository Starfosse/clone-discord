import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { channel } from "diagnostics_channel"
import { z } from "zod"

const serverId = z.object({ serverId: z.string() })

const findFirstPublicChannel = publicProcedure
  .input(serverId)
  .query(async ({ input }) => {
    const userId = await currentUser()
    if (!userId) return
    const user = await prisma.user.findFirst({
      where: { userId: userId.id },
    })
    if (!user) return
    const server = await prisma.server.findFirst({
      where: { id: input.serverId },
      include: {
        channels: true,
        members: true,
      },
    })
    if (!server) return
    const member = server?.members.filter(
      (member) => member.userId === user.id
    )
    console.log("test")
    if (!member) return
    const memberRoles = await prisma.memberRole.findMany({
      where: { MemberId: member[0].id },
    })
    console.log("test")
    if (!memberRoles) return "No role attribued"

    console.log("test")
    let checkViewChannel = false
    for (let i = 0; i < memberRoles.length; i++) {
      const res = await prisma.role.findFirst({
        where: { id: memberRoles[i].RoleId },
      })
      if (res?.view_Channel === true) {
        console.log("good")
        checkViewChannel = true
        break
      }
    }
    console.log("test")
    if (!checkViewChannel)
      return "Not allowed despite roles"
    console.log("test")
    let channelVisible = []
    for (let i = 0; i < server.channels.length; i++) {
      const channel = await prisma.channel.findFirst({
        where: { id: server.channels[i].id },
      })
      if (!channel) return
      if (channel.isPrivate) return
      channelVisible.push(channel)
      if (channelVisible[0]) break
    }

    if (channelVisible[0]) return channelVisible[0]

    let channelsRole = []
    for (let i = 0; i < server.channels.length; i++) {
      const channelRole = await prisma.channelRole.findMany(
        {
          where: { ChannelId: server.channels[i].id },
        }
      )

      if (!channelRole) return
      channelsRole.push(channelRole)
    }
    if (!channelsRole) return
    let channelId
    for (let i = 0; i < channelsRole.length; i++) {
      for (let j = 0; j < channelsRole[i].length; j++) {
        if (
          memberRoles.some(
            (member) =>
              member.RoleId === channelsRole[i][j]?.RoleId
          )
        ) {
          channelId = channelsRole[i][j]?.ChannelId
          break
        }
      }
    }
    return channelId
  })

export default findFirstPublicChannel
