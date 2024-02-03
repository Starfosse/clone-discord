import { z } from "zod"

export const ServerValidatorId = z.object({
  imageUrl: z.string().url().optional().or(z.literal("")),
  name: z
    .string()
    .min(1, {
      message: "Doit contenir au moins 1 caractère",
    }),
  id: z.string(),
})

export type TServerValidatorId = z.infer<
  typeof ServerValidatorId
>
