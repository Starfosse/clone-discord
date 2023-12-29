import Image from "next/image"
import { Separator } from "./ui/separator"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { Button } from "./ui/button"

const SideLeftBar = () => {
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
        {/* liste serveur */}
        {/* <div className="group flex">
          <div className="hidden group-hover:inline relative">
            <div className="absolute top-3 right-1 rounded w-10 h-4 bg-white"></div>
          </div>
          <Image
            src="/logo-discord.png" logo serveur
            alt="logo discord"
            width={40}
            height={40}
            className="rounded-full group-hover:rounded-xl object-cover object-center"
          />
        </div> */}
        <div>
          <button className="text-green-600 hover:text-white bg-secondaryColor rounded-full w-10 h-10 hover:rounded-xl hover:bg-green-600">
            <p className=" text-3xl relative bottom-1">+</p>
          </button>
        </div>
        <div className="mt-auto mb-2 justify-end items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </>
  )
}

export default SideLeftBar
