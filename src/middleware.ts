import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", "/sentry-example-page"],
  ignoredRoutes: ["/api/webhooks/clerk", "/monitoring"],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
} 