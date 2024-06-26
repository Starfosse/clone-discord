"use client"

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import React, { useState } from "react"
import { trpc } from "./client"
import SuperJSON from "superjson"

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return ""
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export function getTrpcUrl() {
  return `${getBaseUrl()}/api/trpc`
}

export default function Provider({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: getTrpcUrl(),
        }),
      ],
    })
  )

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
