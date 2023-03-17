import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import CharacterForm from "../components/CharacterForm";

const AddCharacterPage: React.FC = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  // Replace the createCharacterMutation using useMutation from tRPC
  const { mutate: createCharacter, error } = api.character.create.useMutation();

  const handleFormSubmit = async (formData: {
    name: string;
    classValue: string;
    spec: string;
    role: string;
    realm: string;
  }) => {
    console.log("handleFormSubmit called"); // Add this line
    if (!sessionData?.user.id) {
      toast.error("You must be logged in to add a character.");
      return;
    }

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
        <CharacterForm onSubmit={handleFormSubmit} />
        {error && (
          <p className="error mt-2 text-red-500">Error: {error.message}</p>
        )}
      </main>
    </>
  );
};

export default AddCharacterPage;
