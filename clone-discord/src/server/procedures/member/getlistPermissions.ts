import { prisma } from "@/lib/db"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const serverId = z.object({ serverId: z.string() })

interface permissions {
  invite_Member: boolean
  expulsate_Member: boolean
  edit_Server: boolean
  role_Management: boolean
  view_Logs: boolean
  create_Remove_Channel: boolean
  edit_Channel: boolean
  view_Channel: boolean
  write_Channel: boolean
  speak_Channel: boolean
  video_Channel: boolean
  download_Channel: boolean
}

const getListPermissions = publicProcedure
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
      include: { members: true },
    })
    if (!server) return
    let userMember
    for (let i = 0; i < server.members.length; i++) {
      if (user.id === server.members[i].userId) {
        userMember = server.members[i]
        break
      }
    }
    if (!userMember) return
    const memberRoles = await prisma.memberRole.findMany({
      where: { MemberId: userMember.id },
    })
    if (!memberRoles) return
    let listPermissions: permissions = {
      invite_Member: false,
      expulsate_Member: false,
      edit_Server: false,
      role_Management: false,
      view_Logs: false,
      create_Remove_Channel: false,
      edit_Channel: false,
      view_Channel: false,
      write_Channel: false,
      speak_Channel: false,
      video_Channel: false,
      download_Channel: false,
    }
    for (let i = 0; i < memberRoles.length; i++) {
      const permissions = await prisma.role.findFirst({
        where: { id: memberRoles[i].RoleId },
      })
      if (!permissions) return
      if (permissions.invite_Member)
        listPermissions.invite_Member = true
      if (permissions.expulsate_Member)
        listPermissions.expulsate_Member = true
      if (permissions.edit_Server)
        listPermissions.edit_Server = true
      if (permissions.role_Management)
        listPermissions.role_Management = true
      if (permissions.view_Logs)
        listPermissions.view_Logs = true
      if (permissions.create_Remove_Channel)
        listPermissions.create_Remove_Channel = true
      if (permissions.edit_Channel)
        listPermissions.edit_Channel = true
      if (permissions.view_Channel)
        listPermissions.view_Channel = true
      if (permissions.write_Channel)
        listPermissions.write_Channel = true
      if (permissions.speak_Channel)
        listPermissions.speak_Channel = true
      if (permissions.video_Channel)
        listPermissions.video_Channel = true
      if (permissions.download_Channel)
        listPermissions.download_Channel = true
    }
    return listPermissions
  })

export default getListPermissions
