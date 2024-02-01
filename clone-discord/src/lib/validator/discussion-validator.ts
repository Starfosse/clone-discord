import { z } from "zod"

export const discussionProps = z.object({
  discussionId: z.string().optional(),
  message: z.string(),
})

export type TDiscussionProps = z.infer<
  typeof discussionProps
>
