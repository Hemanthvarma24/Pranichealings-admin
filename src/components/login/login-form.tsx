"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/praniclogo.png";

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const credentials = {
      admin: { email: "admin@gmail.com", password: "admin123" },
      coordinators: {
        email: "coordinators@gmail.com",
        password: "coordinators123",
      },
      healers: { email: "healers@gmail.com", password: "healers123" },
    };

    let userRole = "";

    for (const role of Object.keys(credentials) as Array<
      keyof typeof credentials
    >) {
      const user = credentials[role];
      if (email === user.email && password === user.password) {
        userRole = role;
        break;
      }
    }

    if (userRole) {
      router.push(`/dashboard?role=${userRole}`);
    } else {
      console.log("Invalid email or password");
    }
  };

  return (
    <div className="space-y-6 p-12 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <Link href="/dashboard" passHref>
          <Image
            src={Logo}
            alt="pranic healing Logo"
            width={180}
            height={40}
            priority
            className="mb-4 cursor-pointer"
            unoptimized
          />
        </Link>
        <h1 className="text-2xl font-semibold text-center">Login</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg"
            style={{ borderColor: "#4ead91" }}
          />
        </div>
        <div className="space-y-2">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="w-full p-3 border rounded-lg"
            style={{ borderColor: "#4ead91" }}
          />
        </div>
        <div className="text-left">
          <Link
            href="/forgot-password"
            className="text-sm"
            style={{ color: "#0f82fc" }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.color = "black";
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.color = "#0f82fc";
            }}
          >
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full p-3 rounded-lg font-semibold text-white"
          style={{ backgroundColor: "#4ead91" }}
          onMouseOver={(e) => {
            (e.target as HTMLElement).style.backgroundColor = "#d2fae5";
            (e.target as HTMLElement).style.color = "black";
          }}
          onMouseOut={(e) => {
            (e.target as HTMLElement).style.backgroundColor = "#4ead91";
            (e.target as HTMLElement).style.color = "white";
          }}
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
