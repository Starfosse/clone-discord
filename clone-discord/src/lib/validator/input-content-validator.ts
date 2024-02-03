import { z } from "zod"

export const inputContent = z.object({
  id: z.string(),
  message: z
    .string()
    .min(1, {
      message: "Doit contenir au moins 1 caractère",
    }),
})

export type TInputContent = z.infer<typeof inputContent>
