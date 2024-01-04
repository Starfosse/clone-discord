import { z } from "zod"

export const ServerValidator = z.object({
  imageUrl: z.string().url().optional().or(z.literal("")),
  name: z.string().min(8, {
    message:
      "Votre nom de serveur doit contenir au moins 8 caractères",
  }),
})

export type TServerValidator = z.infer<
  typeof ServerValidator
>
