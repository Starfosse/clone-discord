import { z } from "zod"

export const discussionProps = z.object({
  discussionId: z.string().optional(),
  message: z
    .string()
    .min(1, {
      message: "Doit contenir au moins 1 caractère",
    }),
})

export type TDiscussionProps = z.infer<
  typeof discussionProps
>
