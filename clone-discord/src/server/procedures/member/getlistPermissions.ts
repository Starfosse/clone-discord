import { prisma } from "@/lib/db"
import { authentifiedProcedure } from "@/server/middlewares/authentified"
import { publicProcedure } from "@/server/trpc"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

const serverId = z.object({ serverId: z.string() })

interface permissions {
  invite_Member: boolean
  expel_Member: boolean
  edit_Server: boolean
  delete_Server: boolean
  role_Management: boolean
  view_Logs: boolean
  channel_Management: boolean
  view_Channel: boolean
  write_Channel: boolean
  speak_Channel: boolean
  video_Channel: boolean
  reaction_Channel: boolean
  download_Channel: boolean
  category_Management: boolean
  delete_Input_Channel: boolean
}

const getListPermissions = authentifiedProcedure
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
      expel_Member: false,
      edit_Server: false,
      delete_Server: false,
      role_Management: false,
      view_Logs: false,
      channel_Management: false,
      view_Channel: false,
      write_Channel: false,
      speak_Channel: false,
      video_Channel: false,
      reaction_Channel: false,
      download_Channel: false,
      category_Management: false,
      delete_Input_Channel: false,
    }
    for (let i = 0; i < memberRoles.length; i++) {
      const permissions = await prisma.role.findFirst({
        where: { id: memberRoles[i].RoleId },
      })
      if (!permissions) return
      if (permissions.invite_Member)
        listPermissions.invite_Member = true
      if (permissions.expel_Member)
        listPermissions.expel_Member = true
      if (permissions.edit_Server)
        listPermissions.edit_Server = true
      if (permissions.role_Management)
        listPermissions.role_Management = true
      if (permissions.view_Logs)
        listPermissions.view_Logs = true
      if (permissions.channel_Management)
        listPermissions.channel_Management = true
      if (permissions.category_Management)
        listPermissions.category_Management = true
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
      if (permissions.download_Channel)
        listPermissions.download_Channel = true
      if (permissions.delete_Input_Channel)
        listPermissions.delete_Input_Channel = true
      if (permissions.reaction_Channel)
        listPermissions.reaction_Channel = true
      if (permissions.delete_Server)
        listPermissions.delete_Server = true
    }
    return listPermissions
  })

export default getListPermissions
