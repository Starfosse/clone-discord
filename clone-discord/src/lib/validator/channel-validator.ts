import { ChannelType } from "@prisma/client"
import { z } from "zod"

export const ChannelValidator = z.object({
  id: z.string(),
  name: z.string(),
  type: z.nativeEnum(ChannelType),
  serverId: z.string().optional(),
})

export type TChannelValidator = z.infer<
  typeof ChannelValidator
>
