"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo/Title */}
        <Link href="/" className="text-xl font-bold text-blue-700 dark:text-white">
          CoNectivITTy
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex ml-auto space-x-8">
          <Link
            href="/"
            className="text-blue-700 dark:text-blue-400 hover:underline"
          >
            Home
          </Link>
          <Link
            href="/readmore"
            className="text-gray-700 dark:text-white hover:underline"
          >
            Read more
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 dark:text-white hover:underline"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
