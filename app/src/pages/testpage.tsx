import { GetServerSideProps } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import Header from "../components/Header";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default function IndexPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <p>Welcome, {session?.user?.email ?? "guest"}!</p>
      <Link href="/characters">
        <span>Go to Characters</span>
      </Link>
    </div>
  );
}
