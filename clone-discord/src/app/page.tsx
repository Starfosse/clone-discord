"use client"

import { useRouter } from "next/navigation"
import { trpc } from "./_trpc/client"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()
  const { mutate: createNewUser } =
    trpc.createNewUser.useMutation({})
  const user = trpc.getUser.useQuery()
  useEffect(() => {
    if (!user.data) createNewUser()
  }, [user.data])
  return <>{router.push("/friends/friends-management")}</>
}
