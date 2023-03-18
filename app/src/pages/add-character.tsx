import { useRouter } from "next/router";
import React, { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { createTRPCClient } from "@trpc/client";
import { createTRPCContext } from "../server/api/trpc";

const client = createTRPCClient({
  url: "/api/trpc",
  /**
   * Create a context object that includes the session
   */
  transformer: (fetchEvent) => {
    const { session } = fetchEvent.context ?? {};
    return {
      headers: {
        ...(session ? { Authorization: `Bearer ${session.accessToken}` } : {}),
      },
    };
  },
  /**
   * Pass the session object to createContext to make it available
   * to the client-side trpc calls.
   */
  context: createTRPCContext({
    headers: {},
  }),
});

const AddCharacterPage: React.FC = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const [name, setName] = useState("");
  const [classValue, setClassValue] = useState("");
  const [spec, setSpec] = useState("");
  const [role, setRole] = useState("");
  const [realm, setRealm] = useState("");

  const trpc = useTRPC<AppRouter, typeof createInnerTRPCContext>({
    context: createInnerTRPCContext({ session: sessionData }),
  });

  const { mutateAsync: createCharacter, error } =
    trpc.mutation("character.create");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!sessionData?.user.id) {
      toast.error("You must be logged in to add a character.");
      return;
    }

    const formData = { name, classValue, spec, role, realm };
    console.log("Submitting form data:", formData);

    try {
      await createCharacter({
        ...formData,
        userId: sessionData.user.id,
      });

      toast.success("Character created successfully!");
    } catch (error) {
      console.error("Error creating character:", error);
      toast.error("Error creating character. Please try again.");
    }
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
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded border p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Class:</label>
            <input
              type="text"
              value={classValue}
              onChange={(e) => setClassValue(e.target.value)}
              className="rounded border p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Spec:</label>
            <input
              type="text"
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              className="rounded border p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Role:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded border p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Realm:</label>
            <input
              type="text"
              value={realm}
              onChange={(e) => setRealm(e.target.value)}
              className="rounded border p-2"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              onClick={() => console.log("Submit button clicked")}
              className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default AddCharacterPage;
