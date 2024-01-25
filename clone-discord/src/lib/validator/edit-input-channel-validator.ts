import { z } from "zod"

export const inputChannelValidator = z.object({
  id: z.string(),
  message: z.string(),
})

export type TInputChannelValidator = z.infer<
  typeof inputChannelValidator
>
