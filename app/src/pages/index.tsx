import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
// Import the CharacterList component
import { CharacterList } from "../components/CharacterList";

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
        {/* Add the CharacterList component */}
        <CharacterList />
        {/* Your other main content */}
      </main>
    </>
  );
};

export default Home;
