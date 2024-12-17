import Image from 'next/image';
import React, { ReactNode } from 'react';
import SideMenu from './components/sidemenu';
import './globals.css';
import Link from 'next/link';
import NavBar from './components/NavBar';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import Home from './page';
import Footer from './components/Footer';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="grid grid-rows-[auto_1fr_auto] h-screen">
          {/* Header */}
          <header className="bg-white shadow-md">
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
            </div>
          </header>

          {/* Main Content */}
          <main className="overflow-y-auto bg-purple-100 py-6 px-4 shadow-md max-w-lg mx-auto">
            {children}
          </main>

          {/* Footer */}
          {/* <footer className="bg-gray-200 py-4 flex items-center justify-center">
            <p>Driving & Parking Blog</p>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 h-10"
              href="https://www.myparkingfines.co.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={10}
                height={10}
              />
              Go to nextjs.org →
            </a>
          </footer> */}

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
