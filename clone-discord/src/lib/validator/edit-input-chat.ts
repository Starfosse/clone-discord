import { z } from "zod"

export const editInputChatId = z.object({
  id: z.string(),
  messsageEdited: z.string(),
})

export type TEditInputChatId = z.infer<
  typeof editInputChatId
>
