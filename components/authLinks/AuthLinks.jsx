"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className="no-underline text-white p-2">
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className="no-underline text-black p-2">
            Write
          </Link>
          <span className="no-underline text-black p-2" onClick={signOut}>
            Logout
          </span>
        </>
      )}
      <div
        className="w-5 h-4 flex flex-col justify-between cursor-pointer hidden"
        onClick={() => setOpen(!open)}
      >
        <div className="w-full h-0.5 bg-[var(--textColor)]"></div>
        <div className="w-full h-0.5 bg-[var(--textColor)]"></div>
        <div className="w-full h-0.5 bg-[var(--textColor)]"></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status === "authenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span className="no-underline text-white p-2">Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
