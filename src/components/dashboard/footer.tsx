import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Instagram, Dribbble } from 'lucide-react'
import Logo from "@/app/assets/logo.png"
import Paytm from "@/app/assets/paytm.svg"
import Runpay from "@/app/assets/runpay.svg"
import Visa from "@/app/assets/visa.svg"
import Mastercard from "@/app/assets/dots.svg"
import AppStore from "@/app/assets/appstore.svg"
import PlayStore from "@/app/assets/playstore.svg"

export function Footer() {
  return (
    <footer className="bg-[#e8f1ff] mt-auto">
      <div className="container mx-auto px-4 py-12 lg:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Image 
              src={Logo} 
              alt="Doccure" 
              width={150} 
              height={50} 
              className="h-10 w-auto mb-4" 
              unoptimized
            />
            <p className="text-sm text-gray-600 max-w-md">
              Doccure is one of India&apos;s most trusted pharmacies&lsquo;dispensing quality medicines at reasonable prices to over 9 million happy customers
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">About Doccure</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Customers Speak</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">In the News</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Career</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Our Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Terms and Conditions</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Fees and Payments</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Shipping and Delivery</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Return, Refund</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to Newsletter</h3>
            <div className="space-y-4">
              <Input 
                placeholder="Enter Email Address" 
                className="bg-white"
              />
              <Button className="w-full bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white">
                Submit
              </Button>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap gap-4">
                <Link href="#">
                  <Image 
                    src={AppStore} 
                    alt="Download on the App Store" 
                    width={140} 
                    height={42} 
                    className="h-[42px] w-auto"
                    unoptimized
                  />
                </Link>
                <Link href="#">
                  <Image 
                    src={PlayStore} 
                    alt="Get it on Google Play" 
                    width={140} 
                    height={42} 
                    className="h-[42px] w-auto"
                    unoptimized
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-between md:items-center">
            <div className="flex flex-wrap gap-4">
              <Image src={Paytm} alt="Paytm" width={60} height={30} className="h-8 w-auto" unoptimized/>
              <Image src={Runpay} alt="RuPay" width={60} height={30} className="h-8 w-auto" unoptimized/>
              <Image src={Visa} alt="Visa" width={60} height={30} className="h-8 w-auto" unoptimized/>
              <Image src={Mastercard} alt="Mastercard" width={60} height={30} className="h-8 w-auto" unoptimized/>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700">
                <Dribbble className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-600">
            Copyright © 2024 Doccure. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  )
}

