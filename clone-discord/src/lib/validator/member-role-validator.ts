import { z } from "zod"

const MemberRoleId = z.object({
  id: z.string(),
  role: z
    .string()
    .min(1, {
      message: "Doit contenir au moins 1 caractère",
    }),
  orderServ: z.number().optional(),
  serverId: z.string().optional(),
  invite_Member: z.boolean(),
  expulsate_Member: z.boolean(),
  edit_Server: z.boolean(),
  role_Management: z.boolean(),
  view_Logs: z.boolean(),
  create_Remove_Channel: z.boolean(),
  edit_Channel: z.boolean(),
  view_Channel: z.boolean(),
  write_Channel: z.boolean(),
  speak_Channel: z.boolean(),
  video_Channel: z.boolean(),
  download_Channel: z.boolean(),
})

export type TMemberRoleId = z.infer<typeof MemberRoleId>

export default MemberRoleId
