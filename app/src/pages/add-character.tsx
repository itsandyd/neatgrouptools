import { useRouter } from "next/router";
import React, { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";

const AddCharacterPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [classValue, setClass] = useState("");
  const [spec, setSpec] = useState("");
  const [role, setRole] = useState("");
  const [realm, setRealm] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate input and show error messages if needed

    // Call your API to create a new character in the database
    // You'll need to create an API route to handle this

    // Redirect to the user's characters page after successful submission
    router.push("/profile");
  };

  return (
    <>
      <Head>
        <title>Add Character - Neat Group Tools</title>
        <meta
          name="description"
          content="Add a new character to your Neat Group Tools account"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl">Add Character</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="name" className="block">
              Character Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="class" className="block">
              Class
            </label>
            <input
              type="text"
              id="class"
              value={classValue}
              onChange={(e) => setClass(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="spec" className="block">
              Spec
            </label>
            <input
              type="text"
              id="spec"
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block">
              Role
            </label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="realm" className="block">
              Realm
            </label>
            <input
              type="text"
              id="realm"
              value={realm}
              onChange={(e) => setRealm(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Add Character
          </button>
        </form>
      </main>
    </>
  );
};

export default AddCharacterPage;
