"use client"

import Image from "next/image"
import { Separator } from "./ui/separator"
import Profile from "./Profile"
import AddServer from "./modals/AddServer"
import { trpc } from "@/app/_trpc/client"
import Link from "next/link"

// createNewUser()
const SideLeftBar = () => {
  const { data: userListServ } =
    trpc.getUserListServ.useQuery()

  return (
    <>
      <div className="flex flex-col sticky z-50 bg-tertiaryColor min-h-screen w-14 items-center gap-2 pt-2">
        <div className="group flex">
          {" "}
          {/*Messages Privés*/}
          <div className="hidden group-hover:inline relative">
            <div className="absolute top-3 right-1 rounded w-10 h-4 bg-white"></div>
          </div>
          <Image
            src="/logo-discord.png"
            alt="logo discord"
            width={40}
            height={40}
            className="rounded-full group-hover:rounded-xl object-cover object-center"
          />
        </div>
        <Separator className="w-3/5" />
        {userListServ?.map((server) => (
          <Link
            key={server.id}
            href={`/server/${server.id}`}
            className="group flex cursor-pointer">
            <div className="hidden group-hover:inline relative">
              <div className="absolute top-3 right-1 rounded w-10 h-4 bg-white"></div>
            </div>
            {/*`${server.imageUrl}`*/}
            {server.imageUrl ? (
              <Image
                src="/logo-discord.png"
                alt="logo discord"
                width={40}
                height={40}
                className="rounded-full group-hover:rounded-xl object-cover object-center"
              />
            ) : (
              <div className="bg-secondaryColor rounded-full w-10 h-10 hover:rounded-xl ">
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
          <AddServer />
        </div>
        <div className="mt-auto mb-2 justify-end items-center">
          <Profile />
        </div>
      </div>
    </>
  )
}

export default SideLeftBar
