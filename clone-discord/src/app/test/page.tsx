"use client"

import { trpc } from "@/app/_trpc/client"
import { useInfiniteQuery } from "react-query"

const posts = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
  { id: 3, title: "post 3" },
  { id: 4, title: "post 4" },
  { id: 5, title: "post 5" },
  { id: 6, title: "post 6" },
]

const fetchPost = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return posts.slice((page - 1) * 2, page * 2)
}

const TableDemo = () => {
  // const utils = trpc.useUtils()
  // const { data, fetchNextPage, isFetchingNextPage } =
  //   useInfiniteQuery(
  //     ["query"],
  //     async ({ pageParam = 1 }) => {
  //       const response = await fetchPost(pageParam)
  //       return response
  //     },
  //     {
  //       getNextPageParam: (_, pages) => {
  //         return pages.length + 1
  //       },
  //       initialData: {
  //         pages: [posts.slice(0, 2)],
  //         pageParams: [1],
  //       },
  //     }
  //   )
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = trpc.getInputChannel.useInfiniteQuery(
    {
      channelId: "e3709373-798c-4076-b99c-180ca503681f",
    },
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.nextCursor,
    }
  )
  console.log(data)
  return (
    <div className="text-white">
      posts:
      {data?.pages.map((page, i) => (
        <div className="text-white" key={i}>
          {page.items.map((item) => item.message)}
        </div>
      ))}
      {/* <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}>
        load more
      </button> */}
    </div>
  )
}

export default TableDemo
