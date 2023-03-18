import React, { useState } from "react";
import { useSession } from "next-auth/react";

type CharacterFormProps = {
  onSubmit: (formData: {
    name: string;
    classValue: string;
    spec: string;
    role: string;
    realm: string;
  }) => void;
};

const CharacterForm: React.FC<CharacterFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [classValue, setClassValue] = useState("");
  const [spec, setSpec] = useState("");
  const [role, setRole] = useState("");
  const [realm, setRealm] = useState("");

  const { data: session } = useSession();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (session?.user) {
      onSubmit({ name, classValue, spec, role, realm });
    } else {
      console.log("User is not authenticated");
    }
  };

  return (
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
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Add Character
      </button>
    </form>
  );
};

export default CharacterForm;
