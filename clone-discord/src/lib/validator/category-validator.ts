import { z } from "zod"

export const CategoryValidator = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, {
      message: "Doit contenir au moins 1 caractère",
    }),
})

export type TCategoryValidator = z.infer<
  typeof CategoryValidator
>
