import { z } from "zod"
import { publicProcedure } from "../trpc"
import { prisma } from "@/lib/db"
import MemberRoleId from "@/lib/validator/member-role-validator"

const EditMemberRole = publicProcedure
  .input(MemberRoleId)
  .mutation(async ({ input }) => {
    const { serverId, id } = input
    return await prisma.server.update({
      where: {
        id: serverId,
      },
      data: {
        memberRoles: {
          update: {
            where: {
              id: id,
            },
            data: {
              role: input.role,
              invite_Member: input.invite_Member,
              expulsate_Member: input.expulsate_Member,
              edit_Server: input.edit_Server,
              role_Management: input.role_Management,
              view_Logs: input.view_Logs,
              create_Remove_Channel:
                input.create_Remove_Channel,
              edit_Channel: input.edit_Channel,
              view_Channel: input.view_Channel,
              write_Channel: input.write_Channel,
              speak_Channel: input.speak_Channel,
              video_Channel: input.video_Channel,
              download_Channel: input.download_Channel,
            },
          },
        },
      },
    })
  })

export default EditMemberRole
