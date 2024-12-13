"use client";
import Link from "next/link";
import { useState } from "react";

export default function SideMenu() {
  const [isVisible, setIsVisible] = useState(false);
  // const [isClicked, setIsClicked] = useState(false);

  const toggleMenu = () => {
    setIsVisible(!isVisible);
    return (
      <div>
        {/* Side Menu Button */}
        {/* <button
          onClick={toggleMenu}
          // className="hidden xs:hidden md:block bg-transparent text-black text-2xl border-none cursor-pointer z-10 fixed top-5 right-5"
          className="bg-transparent text-black text-2xl border-none cursor-pointer z-10"
          aria-label="Toggle menu"
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
        {/* Side Menu*/}
        <aside
          className={`absolute top-0 ${
            isVisible ? "right-0" : "-right-[300px]"
          }  h-full w-[250px] bg-yellow-400 text-gray-800 p-5 flex flex-col gap-4 transition-[right] duration-300 ease-in-out`}
        >
          <h2 id="menu" className="mb-2 font-bold text-lg">
            Menu
          </h2>
          <Link
            href="/category/"
            className="flex justify-between items-center hover:text-gray-900 font-small active:text-blue-600"
          >
            Categories
          </Link>
          <Link
            href="/user-posts"
            className="flex justify-between items-center hover:text-gray-900 font-small active:text-blue-600"
          >
            Voices
          </Link>
          <label className="flex justify-between items-center hover:text-gray-900 font-small active:text-blue-600">
            <span>Audio</span>
            <input type="checkbox" checked />
          </label>
          <label>
            <span>Play VOtD</span>
            <input type="checkbox" checked />
          </label>
        </aside>
      </div>
    );
  };
}
