import { Header } from "@/components/dashboard/header"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      <div className="flex-1 flex m-10">
        
        <main className="flex-1 ">
          {children}
        </main>
      </div>
    </div>
  )
}

