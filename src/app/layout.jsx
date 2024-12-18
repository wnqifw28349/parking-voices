import Image from "next/image";
import React, { ReactNode } from "react";
import SideMenu from "./components/sidemenu";
import "./globals.css";
import Link from "next/link";
import NavBar from "./components/NavBar";
import Navigation from "./components/Navigation";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Home from "./page";
import Header from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="grid grid-rows-[auto_1fr_auto] h-screen">
          <Navigation className="bg-white shadow-md w-full max-height-20 z-50" />

          {/*Main Content*/}
          <main className="bg-purple-100 py-6 px-4 rounded-lg shadow-md min-w-80 max-w-lg mx-auto overflow-y-auto">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-200 py-4 flex items-center justify-center">
            <p>Driving & Parking Blog</p>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 h-10"
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
              Get AMP
            </a>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
