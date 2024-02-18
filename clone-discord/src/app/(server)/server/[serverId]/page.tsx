"use client"

import { trpc } from "@/app/_trpc/client"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

const ServerIdPage = () => {
  const channelId = useParams<{ serverId: string }>()
  const routeTo = trpc.findFirstPublicChannel.useQuery(
    channelId!
  )

  const router = useRouter()
  if (
    routeTo.data !== "No role attribued" &&
    routeTo.data !== "Not allowed despite roles" &&
    routeTo.data &&
    typeof routeTo.data !== undefined
  ) {
    router.push(
      `/server/${channelId!.serverId}/channel/${
        routeTo.data
      }`
    )
  }
  // useEffect(() => {
  //   if (
  //     routeTo.data !== "No role attribued" &&
  //     routeTo.data !== "Not allowed despite roles"
  //   ) {
  //     router.push(
  //       `/server/${channelId.serverId}/channel/${routeTo!.data!.id!}`
  //     )
  //   }
  // }, [routeTo.data])
  console.log(routeTo.data)
  return (
    <>
      {routeTo.data === "Not allowed despite roles" ? (
        <div className="bg-primaryColor flex h-full w-full items-center justify-center text-white">
          <div>
            Tu n&apos;as pas la permission de voir des
            salons actuellement.
          </div>
        </div>
      ) : (
        <div className="bg-primaryColor flex h-full w-full items-center justify-center text-white">
          <div>
            Tu n&apos;as pas de rôle assigné et ne peux donc
            pas voir de salons ou catégories actuellement.
          </div>
        </div>
      )}
    </>
  )
}

export default ServerIdPage

//const channelId = useParams<{ channelId: string }>()
