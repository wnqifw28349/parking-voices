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
import { SidebarIcon } from "lucide-react";
import SideMenu from "./sidemenu";
import { toggleMenu } from "./sidemenu";
import { FaIcons } from "react-icons/fa";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
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
    <Link href="/Userprofile">Profile</Link>,
    "My Location",
    "Articles",
    "Appeal Directory",
    "Pay Fines",
    "My Settings",
    "Help & Feedback",
    "Log Out",
  ];

  // const NavbarMenuToggle = (isMenuOpen: boolean) =>
  //   !isMenuOpen ? <MenuOpenIcon /> : <MenuCloseIcon />;

  return (
    <Navbar>
      <NavbarContent className="lg:hidden" justify="start">
        <SideMenu isMenuOpen={isMenuOpen} className="lg:hidden" />
      </NavbarContent>
      <NavbarContent>
        <NavbarBrand>
          <Link href="/" className="flex">
            <Logo href="/" />
            <p className="font-bold text-inherit" href="/">
              Parking Voices
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        hidein="md"
        className="hidden lg:flex gap-4"
        justify="right"
      >
        <NavbarItem>
          <Link color="foreground" href="/Articles">
            Articles
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/Voices">
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
            <Button auto flat href="/sign-in" />
          </SignedOut>
        </NavbarItem>
        {/* <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        ></NavbarMenuToggle> */}
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
