interface Server {
  id: String
  name: String
  imageUrl: String
  inviteCode: String
  userId: String
  createdAt: Date
  updatedAt: Date
}

// import { Server } from "@prisma/client"
import { ArrowBigDown } from "lucide-react"

const ServerLeftHeader = (currentServer: Server) => {
  //   console.log(currentServer)
  return (
    <>
      <div className="flex w-full items-center text-white">
        <p>{currentServer.name}</p>
        <ArrowBigDown className="justify-end ml-auto" />
      </div>
    </>
  )
}

export default ServerLeftHeader
