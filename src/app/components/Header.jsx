import Image from "next/image";
import React, { ReactNode } from "react";
// import SideMenu from "../app/components/sidemenu";
import NavBar from "./NavBar";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
// import Home from "..page";

export default function Header() {
  return (
    <ClerkProvider>
      <div className="flex justify-between items-center px-4 py-3 sm:px-6">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="w-10 h-10"
            width={10}
            height={10}
            href="/"
          />
          <h1 className="text-lg font-bold text-gray-800">Parking Voices</h1>
        </div>
        <div>
          <NavBar />
        </div>
        <div>
          <SignedIn>
            <UserButton className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white" />
            {/* <SideMenu className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white"></SideMenu> */}
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
        <button className="sm:hidden text-gray-600 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </ClerkProvider>
  );
}
