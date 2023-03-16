import React from "react";
import { signIn } from "next-auth/react";

const Hero: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="mb-2 text-5xl font-bold">
        Find Your Perfect Gaming Squad 🎮
      </h1>
      <p className="mb-6 max-w-2xl text-center text-xl">
        Tired of playing with randoms? Unleash your inner gaming legend with
        Neat Group Tools. Discover and create the ultimate team to conquer the
        leaderboards.
      </p>
      <button
        onClick={() => signIn("discord")}
        className="rounded bg-white px-6 py-2 font-semibold text-blue-600"
      >
        Login with Discord
      </button>
    </div>
  );
};

export default Hero;
