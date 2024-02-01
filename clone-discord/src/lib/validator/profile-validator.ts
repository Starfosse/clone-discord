import { stateList } from "@prisma/client"
import { z } from "zod"

export const ProfileValidator = z.object({
  imageUrl: z.any(),
  // .string()
  // .url({ message: "url invalide" })
  // .optional()
  // .or(z.literal("")),
  pseudo: z
    .string()
    // .min(8, {
    //   message:
    //     "Votre pseudo doit contenir au moins 8 caractères",
    // })
    .optional(),
  state: z.nativeEnum(stateList).optional(),
})

export type TProfileValidator = z.infer<
  typeof ProfileValidator
>
