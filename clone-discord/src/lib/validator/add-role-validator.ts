import { z } from "zod"

export const AddRoleValidator = z.object({
  id: z.string(),
  name_role: z
    .string()
    .min(1, {
      message: "Doit contenir au moins un caractère",
    }),
  order_serv: z.number().default(1),
  invite_Member: z.boolean().default(false),
  expulsate_Member: z.boolean().default(false),
  edit_Server: z.boolean().default(false),
  role_Management: z.boolean().default(false),
  view_Logs: z.boolean().default(false),
  create_Remove_Channel: z.boolean().default(false),
  edit_Channel: z.boolean().default(false),
  view_Channel: z.boolean().default(false),
  write_Channel: z.boolean().default(false),
  speak_Channel: z.boolean().default(false),
  video_Channel: z.boolean().default(false),
  download_Channel: z.boolean().default(false),
})

export type TAddRoleValidator = z.infer<
  typeof AddRoleValidator
>
