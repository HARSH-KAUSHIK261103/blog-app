"use client";
import React, { useState, useRef } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [open, setOpen] = useState(false); // State to toggle dropdown visibility

  const { data: session, status } = useSession();

  const userName = session?.user?.name || "User"; // Fallback to "User" if no name available
  const initials = userName
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase())
    .join(""); // Get initials like "HK"

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className="flex items-center justify-between h-24 px-5">
      <div className="text-center text-3xl font-bold">BlogApp</div>
      <div className="flex items-center gap-5 text-lg">
        <Link href="/" className={styles.link}>
          Homepage
        </Link>
        <Link href="/" className={styles.link}>
          Contact
        </Link>
        <Link href="/" className={styles.link}>
          About
        </Link>

        {status === "unauthenticated" ? (
          <Link href="/login" className="no-underline text-white p-2">
            Login
          </Link>
        ) : (
          <div className="relative">
            <div
              className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white text-sm font-semibold"
              onClick={toggleDropdown} // Toggle dropdown visibility
            >
              {initials}
            </div>

            {/* Dropdown Menu */}
            {open && (
              <div
                className="absolute top-full left-0 mt-2 w-[180px] bg-white text-black shadow-lg rounded-md p-2 space-y-2 z-10"
                style={{ animation: "fadeIn 0.3s ease-out" }}
              >
                <Link
                  href="/myblogs"
                  className="block p-3 text-gray-800 rounded-md hover:bg-gray-200 transition duration-200"
                >
                  My Blogs
                </Link>
                <Link
                  href="/write"
                  className="block p-3 text-gray-800 rounded-md hover:bg-gray-200 transition duration-200"
                >
                  Create Blog
                </Link>

                <button
                  onClick={() => signOut()}
                  className="block w-full p-3 text-gray-800 text-left rounded-md hover:bg-red-100 transition duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
