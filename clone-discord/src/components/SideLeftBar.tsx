"use client"

import { trpc } from "@/app/_trpc/client"
import {
  Server,
  User,
  UserFriend,
  inputChat,
} from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import ListUnSeenConv from "./ListUnSeenConv"
import Profile from "./Profile"
import AddServer from "./modals/server/AddServer"
import { Separator } from "./ui/separator"

interface unSeenConv {
  listUnSeenConv: inputChat[][]
  listFriendData: User[]
  userFriendList: UserFriend[]
}

const SideLeftBar = () => {
  const [currentListUnSeenConv, setCurrentListUnSeenConv] =
    useState<unSeenConv | undefined>()
  const [userListServ, setUserListServ] = useState<
    Server[] | undefined
  >()

  const userListServData = trpc.getUserListServ.useQuery()
  const listUnSeenConvData =
    trpc.getListUnseenDiscussion.useQuery()

  useEffect(() => {
    if (userListServData.data)
      setUserListServ(userListServData.data)
    if (listUnSeenConvData.data)
      setCurrentListUnSeenConv(listUnSeenConvData.data)
  }, [userListServData.data, listUnSeenConvData.data])

  return (
    <>
      <div className="flex flex-col sticky z-50 bg-tertiaryColor min-h-screen w-14 items-center gap-2 pt-2">
        <div className="group flex">
          {" "}
          {/*Messages Privés*/}
          <div className="hidden group-hover:inline relative">
            <div className="absolute top-3 right-1 rounded w-10 h-4 bg-white"></div>
          </div>
          <Link href={"/friends/friends-management"}>
            <Image
              src="/logo-discord.png"
              alt="logo discord"
              width={40}
              height={40}
              className="rounded-full  group-hover:rounded-xl object-cover object-center"
            />
          </Link>
        </div>
        {currentListUnSeenConv && (
          <ListUnSeenConv
            currentListUnSeenConv={currentListUnSeenConv}
          />
        )}
        <Separator className="w-3/5" />
        {userListServ &&
          userListServ.map((server) => (
            <Link
              prefetch={true}
              key={server.id}
              href={`/server/${server.id}`}
              className="group flex cursor-pointer">
              <div className="hidden group-hover:inline relative">
                <div className="absolute top-3 right-1 rounded w-10 h-4 bg-white"></div>
              </div>
              {server.imageUrl ? (
                <Image
                  src={server.imageUrl}
                  alt="logo server"
                  width={40}
                  height={40}
                  className="rounded-full group-hover:rounded-xl object-cover object-center aspect-square"
                />
              ) : (
                <div className="bg-secondaryColor rounded-full  w-10 h-10 hover:rounded-xl ">
                  <p className="relative top-2 text-center text-white text-sm">
                    {server.name
                      .split(" ")
                      .map((word) => word.charAt(0))
                      .join("")
                      .slice(0, 5)}
                  </p>
                </div>
              )}
            </Link>
          ))}

        <div>
          <AddServer refetch={userListServData.refetch} />
        </div>
        <div className="mt-auto mb-2 justify-end items-center">
          <Profile />
        </div>
      </div>
    </>
  )
}

export default SideLeftBar
