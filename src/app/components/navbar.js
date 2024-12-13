import Link from "next/link";
import SideMenu from "./sidemenu";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { auth, currentUser } from "@clerk/nextjs/server";

export default function NavBar(toggleMenu) {
  async function fetchUser(params) {
    // if you just need the users id
    const user = await auth();
    // if you need their image, name, email whatever
    const currentUserObj = await currentUser();
    console.log(user);
    console.log(currentUserObj);
  }
  fetchUser();

  return (
    <div>
      <nav>
        <div className="hidden sm:hidden md:block sm:flex flex-r h-10 space-x-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 font-medium active:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/category/"
            className="text-gray-600 hover:text-gray-900 font-medium active:text-blue-600"
          >
            Categories
          </Link>
          <Link
            href="/user-posts"
            className="text-gray-600 hover:text-gray-900 font-medium active:text-blue-600"
          >
            Voices
          </Link>
          <div>
            {currentUserObj && (
              <div className="flex items-center space-x-4">
                {currentUserObj.firstName
                  ? `Hello ${currentUserObj.firstName}`
                  : "Hello"}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Menu Icon */}
          {/* <button
            // onClick={toggleMenu}
            id="menuButton"
            className="bg-transparent text-black text-2xl border-none cursor-pointer z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button> */}
          {/* <SideMenu /> */}
        </div>

        {/* if they're signed out show them this */}
        <SignedOut className="m-8">
          <SignInButton />
        </SignedOut>
      </nav>
    </div>
  );
}
