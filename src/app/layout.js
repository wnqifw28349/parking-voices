import Image from "next/image";
import React, { ReactNode } from "react";
import SideMenu from "./components/sidemenu";
import "./globals.css";
import Link from "next/link";
import NavBar from "./components/NavBar";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Home from "./page";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="bg-white shadow-md fixed top-0 left-0 right-0 w-full max-height-20 shadow z-50">
            <div className="flex justify-between items-center px-4 py-3 sm:px-6">
              <div className="flex items-center space-x-4">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  className="w-10 h-10"
                  width={10}
                  height={10}
                />
                <h1 className="text-lg font-bold text-gray-800">
                  Parking Voices
                </h1>
                <div>
                  <NavBar />
                </div>
                <div>
                  <SignedIn>
                    <UserButton className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white" />
                    <SideMenu className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white"></SideMenu>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                </div>
              </div>
            </div>
          </header>
          <main className="bg-purple-100 py-6 px-4 rounded-lg shadow-md max-w-lg mx-auto mt-16">
            {children}
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <p>Driving & Parking Blog</p>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://www.myparkingfines.co.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/ampicon.svg"
                alt="Amp icon"
                width={16}
                height={16}
              />
            </a>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
