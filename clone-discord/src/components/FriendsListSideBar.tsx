import { Users } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import ListDiscussion from "./ListDiscussion"

const FriendsListSideBar = () => {
  return (
    <div className="text-white flex flex-col px-3">
      <div className="my-2 ">
        <Link
          href={"/friends/friends-management"}
          className="rounded-md justify-start w-full flex hover:bg-gray-950 p-2">
          <Users />
          <p className="pl-4">Amis</p>
        </Link>
        {/* <Button className="justify-start w-full">
          <Users />
          <p className="pl-4">Amis</p>
        </Button> */}
      </div>
      <div className="px-2">
        <div className="py-2 text-muted-foreground">
          Messages Privés
        </div>
        <div>
          <ListDiscussion />
        </div>
      </div>
    </div>
  )
}

export default FriendsListSideBar
