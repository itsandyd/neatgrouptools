import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const LoginPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/profile");
    }
  }, [status]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl">Login</h1>
      <button
        onClick={() => {
          signIn("discord").catch((error) => {
            console.error("Error signing in:", error);
          });
        }}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Sign in with Discord
      </button>
    </div>
  );
};

export default LoginPage;
