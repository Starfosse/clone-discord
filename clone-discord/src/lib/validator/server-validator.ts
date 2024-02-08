import { z } from "zod"
import { Base64 } from "js-base64"

export const ServerValidator = z.object({
  imageUrl:
    typeof window === "undefined"
      ? z.any().optional()
      : z.instanceof(FileList).optional(),
  name: z.string().min(1, {
    message: "Doit contenir au moins 1 caractère",
  }),
})

export type TServerValidator = z.infer<
  typeof ServerValidator
>
