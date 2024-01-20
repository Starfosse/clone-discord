import { z } from "zod"

export const inputContent = z.object({
  id: z.string(),
  message: z.string(),
})

export type TInputContent = z.infer<typeof inputContent>
