import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const cursor = searchParams.get("cursor")
    const discussionId = searchParams.get("discussionId")

    if (!discussionId) return
    const limit = 10
    const items = await prisma.inputChat.findMany({
      take: limit + 1,
      where: {
        userFriendId: discussionId,
      },
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    })
    let nextCursor: typeof cursor | undefined = undefined
    if (items.length > limit) {
      const nextItem = items.pop()
      nextCursor = nextItem!.id
    }

    return NextResponse.json({
      items,
      nextCursor,
    })
  } catch (error) {
    console.log("[MESSAGES_GET]", error)
    return new NextResponse("Internal Error", {
      status: 500,
    })
  }
}
