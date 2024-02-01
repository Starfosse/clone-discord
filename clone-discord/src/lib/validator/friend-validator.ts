import { z } from "zod"

export const FriendValidator = z.object({
  pseudo: z.string(),
})

export type TFriendValidator = z.infer<
  typeof FriendValidator
>
