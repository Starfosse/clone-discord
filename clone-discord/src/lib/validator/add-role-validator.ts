import { z } from "zod"

export const AddRoleValidator = z.object({
  id: z.string(),
  name_role: z.string(),
  invite_Member: z.boolean().default(false).optional(),
  expulsate_Member: z.boolean().default(false).optional(),
  edit_Server: z.boolean().default(false).optional(),
  role_Management: z.boolean().default(false).optional(),
  view_Logs: z.boolean().default(false).optional(),
  create_Remove_Channel: z
    .boolean()
    .default(false)
    .optional(),
  edit_Channel: z.boolean().default(false).optional(),
  view_Channel: z.boolean().default(false).optional(),
  write_Channel: z.boolean().default(false).optional(),
  speak_Channel: z.boolean().default(false).optional(),
  video_Channel: z.boolean().default(false).optional(),
  download_Channel: z.boolean().default(false).optional(),
})

export type TAddRoleValidator = z.infer<
  typeof AddRoleValidator
>
