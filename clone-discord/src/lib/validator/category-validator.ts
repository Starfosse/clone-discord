import { z } from "zod"

export const CategoryValidator = z.object({
  id: z.string(),
  name: z.string(),
})

export type TCategoryValidator = z.infer<
  typeof CategoryValidator
>
