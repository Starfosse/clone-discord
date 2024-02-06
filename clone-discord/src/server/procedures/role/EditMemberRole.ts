import { z } from "zod"
import { publicProcedure } from "../../trpc"
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
        roles: {
          update: {
            where: {
              id: id,
            },
            data: {
              role: input.role,
              invite_Member: input.invite_Member,
              expel_Member: input.expel_Member,
              edit_Server: input.edit_Server,
              delete_Server: input.delete_Server,
              role_Management: input.role_Management,
              view_Logs: input.view_Logs,
              channel_Management: input.channel_Management,
              view_Channel: input.view_Channel,
              write_Channel: input.write_Channel,
              speak_Channel: input.speak_Channel,
              video_Channel: input.video_Channel,
              reaction_Channel: input.reaction_Channel,
              download_Channel: input.download_Channel,
              category_Management:
                input.category_Management,
              delete_Input_Channel:
                input.delete_Input_Channel,
            },
          },
        },
      },
    })
  })

export default EditMemberRole
