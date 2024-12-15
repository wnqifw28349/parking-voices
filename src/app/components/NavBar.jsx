import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { auth, currentUser } from "@clerk/nextjs/server";

export default async function NavBar() {
  // if you just need the users id
  // const user = await auth();

  // if you need their image, name, email whatever
  const user = await currentUser();

  // console.log(user);
  // console.log("User:", user);
  return (
    <div className="flex flex-row m-8">
      <nav className="hidden sm:flex space-x-6">
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
        <Link href="/UserAccount">MyAccount</Link>
        <SignedIn>
          <div>Hello {user?.firstName}</div>
        </SignedIn>
        <div className="flex items-center space-x-4">
          {/* Menu Icon */}
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
        <br />
        {/* if the user is signed in */}
        <SignedIn className="m-8">
          {/* <p>Hello {currentUserObj.firstName}</p> */}
          <UserButton className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white" />
        </SignedIn>

        {/* if they're signed out show them this */}
        <SignedOut className="m-8">
          <SignInButton />
        </SignedOut>
      </nav>
    </div>
  );
}
