// components/CharacterList.tsx

import { api } from "~/utils/api";

export function CharacterList() {
  const charactersQuery = api.useQuery(["getCharacters"]);

  if (charactersQuery.isLoading) {
    return <div className="text-lg font-semibold">Loading...</div>;
  }

  if (charactersQuery.error) {
    return (
      <div className="font-semibold text-red-600">
        Error: {charactersQuery.error.message}
      </div>
    );
  }

  const characters = charactersQuery.data;

  return (
    <div className="my-4 rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Characters</h1>
      <ul className="list-inside list-disc">
        {characters.map((character) => (
          <li key={character.id} className="py-1 text-lg">
            {character.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
