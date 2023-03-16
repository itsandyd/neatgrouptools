import Link from "next/link";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const { data: sessionData } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="relative flex items-center justify-between bg-white py-4 px-4 shadow-md">
      <Link href="/">
        <span className="cursor-pointer text-2xl font-bold text-blue-600">
          Neat Group Tools
        </span>
      </Link>
      <div className="flex items-center">
        {sessionData?.user && (
          <>
            <button onClick={toggleMenu}>
              <img
                src={sessionData.user.image ?? "/default-avatar.png"}
                alt={sessionData.user.name ?? "User"}
                className="mr-4 h-8 w-8 cursor-pointer rounded-full"
              />
            </button>
            {menuOpen && (
              <div className="absolute right-28 mt-24 rounded border border-gray-200 bg-white shadow-md">
                <Link href="/profile">
                  <span className="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Profile
                  </span>
                </Link>
              </div>
            )}
          </>
        )}
        {sessionData?.user ? (
          <button
            onClick={() => signOut()}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Sign out
          </button>
        ) : (
          <button
            onClick={() => signIn("discord")}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Sign in with Discord
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
