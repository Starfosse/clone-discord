import { z } from "zod"

export const ServerValidator = z.object({
  imageUrl: z.string().url().optional().or(z.literal("")),
  name: z
    .string()
    .min(1, {
      message: "Doit contenir au moins 1 caractère",
    }),
})

export type TServerValidator = z.infer<
  typeof ServerValidator
>
