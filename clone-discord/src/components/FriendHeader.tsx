import { User } from "@prisma/client"
import Image from "next/image"

const FriendHeader = (currentFriend: User) => {
  return (
    <div className=" bg-primaryColor h-14 sticky w-full flex items-center pl-4 text-2xl border-b border-b-black z-50">
      {/* nom + image user */}
      {currentFriend && (
        <div className="flex ml-4 gap-4 items-center">
          <Image
            alt="avatar-friend"
            className="rounded-full"
            src={currentFriend?.imageUrl}
            width={16}
            height={16}
          />
          <Image
            className="relative top-2 right-5 z-10 rounded-full border-[3px] border-tertiaryColor"
            src={`/${currentFriend.state.toLocaleLowerCase()}.png`}
            width={8}
            height={8}
            alt="ok"
          />
          <p>{currentFriend.pseudo}</p>
        </div>
      )}
    </div>
  )
}

export default FriendHeader
