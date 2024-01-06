import ServerSideBar from "@/components/ServerSideBar"

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      <main className="h-full relative">
        <ServerSideBar />
        <div className="flex-grow flex-1">{children}</div>
      </main>
    </div>
  )
}
