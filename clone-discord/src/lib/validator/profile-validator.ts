import { stateList } from "@prisma/client"
import { z } from "zod"

export const ProfileValidator = z.object({
  imageUrl: z.any(),
  pseudo: z
    .string()
    .min(1, {
      message: "Doit contenir au moins 1 caractère",
    })
    .optional(),
  state: z.nativeEnum(stateList).optional(),
})

export type TProfileValidator = z.infer<
  typeof ProfileValidator
>
