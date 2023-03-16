import { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Neat Group Tools</title>
        <meta
          name="description"
          content="Find and create the perfect gaming group with Neat Group Tools"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Hero />
        {/* Your other main content */}
      </main>
    </>
  );
};

export default Home;
