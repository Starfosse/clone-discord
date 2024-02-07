import { User } from "@prisma/client"
import Image from "next/image"

interface friendHeaderProps {
  currentFriend: User
}

const FriendHeader = (fHP: friendHeaderProps) => {
  return (
    <div className=" bg-primaryColor h-14 sticky w-full flex items-center pl-4 text-2xl border-b border-b-black z-50">
      {fHP.currentFriend && (
        <div className="flex ml-4 gap-4 items-center relative">
          <Image
            alt="avatar-friend"
            className="rounded-full aspect-square"
            src={fHP.currentFriend?.imageUrl}
            width={20}
            height={20}
          />
          <Image
            className="absolute top-[0.85rem] left-3 z-10 object-cover object-center rounded-full border-[3px] border-tertiaryColor"
            src={`/${fHP.currentFriend.state.toLocaleLowerCase()}.png`}
            width={12}
            height={12}
            alt="ok"
          />
          <p className="text-lg">
            {fHP.currentFriend.pseudo}{" "}
          </p>
          {/* <div className="flex ml-auto justify-end">
            <button onClick={fHP.calling}>
              <PhoneCall className="ml-auto" />
            </button>
            <button onClick={fHP.recording}>
              <Video className="ml-auto" />
            </button>
          </div> */}
        </div>
      )}
    </div>
  )
}

export default FriendHeader
