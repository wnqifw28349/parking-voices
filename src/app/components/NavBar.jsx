import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { auth, currentUser } from "@clerk/nextjs/server";

export default async function NavBar() {
  // if you just need the users id
  const userprime = await auth();

  // if you need their image, name, email whatever
  const user = await currentUser(userprime);

  // console.log(user);
  // console.log("User:", user);
  return (
    <div className="flex flex-row m-8 items-right">
      <nav className="hidden sm:flex space-x-6">
        {/* <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 font-medium active:text-blue-600"
        >
          Home
        </Link> */}
        {/* <Link
          href="/category/"
          className="text-gray-600 hover:text-gray-900 font-medium active:text-blue-600"
        >
          Categories
        </Link> */}
        <Link
          href="/voices"
          className="text-gray-600 hover:text-gray-900 font-medium active:text-blue-600"
        >
          Voices
        </Link>
        <Link href="/UserAccount">MyAccount</Link>
        <SignedIn>
          <div className="font-small space-x-4">Hello {user?.firstName}</div>
        </SignedIn>
        {/* <div className="flex items-center space-x-4">
          {/* Menu Icon */}

        {/* </div> */}
        {/* <br /> */}
        {/* if the user is signed in */}
        {/* <SignedIn className="m-8"> */}
        {/* <p>Hello {currentUserObj.firstName}</p> */}
        {/* <UserButton className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white" />
        </SignedIn> */}

        {/* if they're signed out show them this */}
        {/* <SignedOut className="m-8">
          <SignInButton />
        </SignedOut> */}
      </nav>
    </div>
  );
}
