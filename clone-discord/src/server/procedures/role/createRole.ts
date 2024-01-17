import { AddRoleValidator } from "@/lib/validator/add-role-validator"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"

const createRole = publicProcedure
  .input(AddRoleValidator)
  .mutation(async ({ input }) => {
    const sizeMemberRole = await prisma.server.findFirst({
      where: {
        id: input.id,
      },
      select: {
        memberRoles: true,
      },
    })
    return await prisma.server.update({
      where: {
        id: input.id,
      },
      data: {
        memberRoles: {
          create: {
            role: input.name_role,
            orderServ: sizeMemberRole?.memberRoles.length
              ? sizeMemberRole?.memberRoles.length + 1
              : 1000,
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
    })
  })

export default createRole
