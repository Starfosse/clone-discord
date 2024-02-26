import { authMiddleware, currentUser } from "@clerk/nextjs"
import { createNewUser } from "./server/procedures/user/createNewUser"

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export default authMiddleware({
  publicRoutes: [
    "/",
    "/^/api/webhook//",
    "/authentification/sign-up",
  ],
  // ignoredRoutes: [
  //   "/((?!api|trpc))(_next.*|.+.[w]+$)",
  //   "/api/trpc/hello",
  // ],
})

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
}
