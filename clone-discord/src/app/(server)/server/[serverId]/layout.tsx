import SideLeftServerBar from "@/components/SideLeftServerBar"

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">
      <main className="relative flex flex-col min-h-screen">
        <SideLeftServerBar />
        <div className="flex-grow flex-1">{children}</div>
      </main>
    </div>
  )
}
