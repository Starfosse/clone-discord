"use client"

import { useSocket } from "./socket-provider"

export const SocketIndicator = () => {
  const { isConnected } = useSocket()

  if (!isConnected) {
    return (
      <div className="bg-yellow-600 text-white border-none">
        Fallback: Polling every 1s
      </div>
    )
  }

  return (
    <div className="bg-emerald-600 text-white border-none">
      Live: Real-time updates
    </div>
  )
}
