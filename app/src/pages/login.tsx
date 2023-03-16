import { signIn } from "next-auth/react";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl">Login</h1>
      <button
        onClick={() => signIn("discord")}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Sign in with Discord
      </button>
    </div>
  );
};

export default LoginPage;
