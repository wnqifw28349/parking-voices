// import Link from "next/link";
"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { FiMenu, FiX } from "react-icons/fi";
// import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";

export const Logo = () => {
  return (
    <img
      height="36"
      src="/logo.svg"
      alt="Logo"
      className="w-10 h-10"
      width={36}
      href="/"
    />
  );
};
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "My Location",
    "Articles",
    "Appeal Directory",
    "Pay Fines",
    "My Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="px-4 py-3 sm:px-6">
      <NavbarContent>
        {/* <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        /> */}
        <NavbarBrand>
          <Logo />
          <p className="font-bold text-inherit">Parking Voices</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-4" justify="right">
        <NavbarItem>
          <Link color="foreground" href="#Articles">
            Articles
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#Voices">
            Voices
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {/* className="hidden lg:flex" */}
          <SignedIn>
            <UserButton
              className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white"
              color="primary"
              variant="flat"
            />
          </SignedIn>
        </NavbarItem>
        <NavbarItem>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </NavbarItem>
        <NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden"
            // { <FiX size={24} /> | <FiMenu size={24} />}
          >
            =
          </NavbarMenuToggle>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <SignedIn>
            <UserButton className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white" />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </NavbarMenuItem>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
