import { z } from "zod"

export const ChannelValidator = z.object({
  id: z.string(),
  name: z.string(),
})

export type TChannelValidator = z.infer<
  typeof ChannelValidator
>
