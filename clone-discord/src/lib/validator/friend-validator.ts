import { z } from "zod"

export const FriendValidator = z.object({
  pseudo: z
    .string()
    .min(1, {
      message: "Doit contenir au moins 1 caractère",
    }),
})

export type TFriendValidator = z.infer<
  typeof FriendValidator
>
