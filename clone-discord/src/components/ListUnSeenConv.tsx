import { trpc } from "@/app/_trpc/client"
import { User, UserFriend, inputChat } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface ListUnSeenConvProps {
  currentListUnSeenConv: {
    listUnSeenConv: inputChat[][]
    listFriendData: User[]
    userFriendList: UserFriend[]
  }
}

const ListUnSeenConv = ({
  currentListUnSeenConv,
}: ListUnSeenConvProps) => {
  const { mutate: shownMessage } =
    trpc.editMessageShown.useMutation()

  const getNumberUnSeenMessage = (index: number) => {
    return currentListUnSeenConv.listUnSeenConv[index]
      .length
  }

  const handleShownMessage = (id: string) => {
    const userFriendId = { id: id }
    shownMessage(userFriendId)
  }
  return (
    <div className="flex gap-2 mt-1 relative">
      {currentListUnSeenConv.listFriendData.map(
        (user, index) => (
          <Link
            href={`/friends/${currentListUnSeenConv.userFriendList[index].id}`}
            key={user.id}
            onClick={() =>
              handleShownMessage(
                currentListUnSeenConv.userFriendList[index]
                  .id
              )
            }>
            <Image
              height={40}
              width={40}
              src={user.imageUrl}
              alt="image user"
              className="rounded-full aspect-square"
            />
            <p className="text-white absolute left-5 bottom-0 bg-red-800 rounded-full aspect-square px-2">
              {getNumberUnSeenMessage(index)}{" "}
            </p>
          </Link>
        )
      )}{" "}
    </div>
  )
}

export default ListUnSeenConv
