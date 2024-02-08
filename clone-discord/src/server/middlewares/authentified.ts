import { TRPCError } from "@trpc/server"
import { middleware, publicProcedure } from "../trpc"

const authentified = middleware(async (opts) => {
  const { ctx } = opts
  const userId = ctx.auth.userId
  if (!userId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Your session is invalid",
    })
  }
  return opts.next({
    ctx: {
      ...ctx,
      userId,
    },
  })
})

export const authentifiedProcedure =
  publicProcedure.use(authentified)
