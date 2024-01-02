import { stateList } from "@prisma/client"
import { z } from "zod"

export const ProfileValidator = z.object({
  imageUrl: z.string().url({ message: "Url invalide" }),
  pseudo: z.string().min(8, {
    message:
      "Votre pseudo doit contenir au moins 8 caractères",
  }),
  state: z.nativeEnum(stateList),
})

export type TProfileValidator = z.infer<
  typeof ProfileValidator
>
