import { Channel } from "@prisma/client"
import { Hash } from "lucide-react"
import ChatDisplay from "./ChatDisplay"
import InputChannel from "./InputChannel"

const ChannelText = (currentChannel: Channel) => {
  return (
    <>
      <div className="text-white flex flex-col h-full">
        <div className=" bg-primaryColor h-14 sticky w-full flex items-center pl-4 text-2xl border-b border-b-black z-50">
          <Hash width={20} />
          &nbsp;{currentChannel?.name}
        </div>
        <ChatDisplay {...currentChannel} />
        <div className="mt-auto sticky">
          <InputChannel {...currentChannel} />
        </div>
      </div>
    </>
  )
}

export default ChannelText
