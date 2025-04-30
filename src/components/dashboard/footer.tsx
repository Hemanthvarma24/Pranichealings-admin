import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Instagram, Dribbble } from "lucide-react";
import Logo from "@/app/assets/praniclogo.png";
import Paytm from "@/app/assets/paytm.svg";
import Runpay from "@/app/assets/runpay.svg";
import Visa from "@/app/assets/visa.svg";
import Mastercard from "@/app/assets/dots.svg";
import AppStore from "@/app/assets/appstore.svg";
import PlayStore from "@/app/assets/playstore.svg";

export function Footer() {
  // Get the current year for copyright text
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#e8f1ff] mt-auto">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Image
              src={Logo}
              alt="pranic healing"
              width={280}
              height={100}
              className="w-auto h-32 mb-2"
              unoptimized
            />

            <p className="text-sm text-gray-600 max-w-md">
              pranic healing is one of India&apos;s most trusted
              pharmacies&lsquo;dispensing quality medicines at reasonable prices
              to over 9 million happy customers
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  About pranic healing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Customers Speak
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  In the News
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Career
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Our Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Fees and Payments
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Shipping and Delivery
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Return, Refund
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
            Connect with us
            </h3>
            <div className="space-y-4">
              <Input placeholder="Enter Email Address" className="bg-white" />
              <Button className="w-full bg-[#4ead91] hover:bg-[#0b5ed7] text-white">
                Submit
              </Button>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex flex-row gap-4">
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

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            {/* Payment Methods */}
            <div className="flex flex-wrap gap-4 items-center">
              <Image
                src={Paytm}
                alt="Paytm"
                width={60}
                height={30}
                className="h-8 w-auto"
                unoptimized
              />
              <Image
                src={Runpay}
                alt="RuPay"
                width={60}
                height={30}
                className="h-8 w-auto"
                unoptimized
              />
              <Image
                src={Visa}
                alt="Visa"
                width={60}
                height={30}
                className="h-8 w-auto"
                unoptimized
              />
              <Image
                src={Mastercard}
                alt="Mastercard"
                width={60}
                height={30}
                className="h-8 w-auto"
                unoptimized
              />
            </div>

            {/* Social Media Links */}
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram, Dribbble].map(
                (Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              )}
            </div>

            {/* Copyright Section */}
            <div className="text-sm text-gray-600 whitespace-nowrap">
              © {currentYear} Pranic Healing. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
