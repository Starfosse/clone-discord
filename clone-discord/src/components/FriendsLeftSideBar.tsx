"use client"

import { Users } from "lucide-react"
import Link from "next/link"
import ListDiscussion from "./ListDiscussion"
import { trpc } from "@/app/_trpc/client"
import { useEffect, useState } from "react"
import { User } from "@prisma/client"

const FriendsLeftSideBar = () => {
  const [currentWho, setCurrentWho] = useState<
    User | undefined
  >()

  const whoData = trpc.getUser.useQuery()

  useEffect(() => {
    if (whoData.data) setCurrentWho(whoData.data)
  }, [whoData.data])

  return (
    <div className="text-white flex flex-col">
      <div className="my-2 ">
        <Link
          href={"/friends/friends-management"}
          className="rounded-md justify-start w-full flex hover:bg-gray-950 p-2">
          <Users />
          <p className="pl-4">Amis</p>
        </Link>
      </div>
      <div className="px-2">
        <div className="py-2 text-muted-foreground">
          Messages Privés
        </div>
        <div>
          {currentWho && <ListDiscussion {...currentWho} />}
        </div>
      </div>
    </div>
  )
}

export default FriendsLeftSideBar
