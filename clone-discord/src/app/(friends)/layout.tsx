import FriendsListSideBar from "@/components/FriendsListSideBar"

export default function FriendsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      <main className="h-full relative flex">
        <div className="w-52 bg-secondaryColor sticky z-50 h-full flex flex-col">
          <FriendsListSideBar />
        </div>
        <div className="flex-grow flex-1">{children}</div>
      </main>
    </div>
  )
}
