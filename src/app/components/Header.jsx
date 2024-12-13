import Image from "next/image";
import React, { ReactNode } from "react";
// import SideMenu from "../app/components/sidemenu";
import "./globals.css";
// import NavBar from "../app/components/navbar";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
// import Home from "./page";

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
          />
          <h1 className="text-lg font-bold text-gray-800">Parking Voices</h1>
        </div>
        <div>{/* <NavBar /> */}</div>
        <div>
          <SignedIn>
            <UserButton className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white" />
            {/* <SideMenu className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white"></SideMenu> */}
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </ClerkProvider>
  );
}
