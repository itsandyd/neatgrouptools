import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import UserCharacters from "../components/UserCharacters";
import UserTeams from "../components/UserTeams";
import Link from "next/link";

const Profile: NextPage = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Profile - Neat Group Tools</title>
        <meta name="description" content="User profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-4xl font-bold">
          Welcome, {sessionData.user.name}!
        </h1>

        <section className="mb-8">
          <h2 className="mb-4 text-3xl font-semibold">Your Characters</h2>
          <UserCharacters />
          <Link href="/add-character">
            <button className="mt-4 rounded bg-blue-600 px-4 py-2 text-white">
              Add Character
            </button>
          </Link>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Your Teams</h2>
          <UserTeams />
          <div className="mt-4 space-x-4">
            <Link href="/create-team">
              <button className="rounded bg-blue-600 px-4 py-2 text-white">
                Create Team
              </button>
            </Link>
            <Link href="/view-teams">
              <button className="rounded bg-blue-600 px-4 py-2 text-white">
                View Teams
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
