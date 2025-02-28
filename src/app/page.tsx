
import { Footer } from "@/components/login/footer"
import { LoginForm } from "@/components/login/login-form"
import Image from "next/image"
import Logobanner from "@/app/assets/login-banner.png"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="hidden md:block">
                <Image
                  src={Logobanner}
                  alt="Login Banner"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}