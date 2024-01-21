import { publicProcedure } from "@/server/trpc"

const hello = publicProcedure.query(async () => {
  return "hello"
})

export default hello
