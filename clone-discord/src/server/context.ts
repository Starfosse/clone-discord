import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import {
  getAuth,
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/server"
import { NextRequest } from "next/server"

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject
}

export const createContextInner = async ({
  auth,
}: AuthContext) => {
  return {
    auth,
  }
}

export const createContext = async (req: NextRequest) => {
  return await createContextInner({ auth: getAuth(req) })
}

export type Context = trpc.inferAsyncReturnType<
  typeof createContext
>
