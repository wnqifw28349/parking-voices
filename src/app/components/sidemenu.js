"use client";

import Link from "next/link";
import { useState } from "react";

export default function SideMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Side Menu Button */}
      <button
        onClick={toggleMenu}
        className="bg-transparent text-black text-2xl border-none cursor-pointer z-50"
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
      </button>

      {/* Side Menu */}
      <aside
        className={`fixed top-0 ${
          isMenuOpen ? "left-0" : "-left-[300px]"
        } h-full w-[250px] bg-[#D7C3F1] text-gray-800 p-5 flex flex-col gap-4 transition-all duration-300 ease-in-out z-40 shadow-lg`}
      >
        <h2 id="menu" className="mb-2 font-bold text-lg">
          Menu
        </h2>

        <Link
          href="/profile/"
          className="hover:text-gray-900 font-small active:text-blue-600"
        >
          My Profile
        </Link>
        <Link
          href="/articles/"
          className="hover:text-gray-900 font-small active:text-blue-600"
        >
          Articles
        </Link>
        <Link
          href="/voices"
          className="hover:text-gray-900 font-small active:text-blue-600"
        >
          Voices
        </Link>
        <label className="flex justify-between items-center hover:text-gray-900 active:text-blue-600">
          <span>Audio</span>
          <input type="checkbox" defaultChecked />
        </label>
        <label className="flex justify-between items-center hover:text-gray-900 active:text-blue-600">
          <span>Play VOtD</span>
          <input type="checkbox" defaultChecked />
        </label>
      </aside>

      {/* Overlay to close the menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
}
