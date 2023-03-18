import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupSupabase() {
  await createUsersTable();
  await createCharactersTable();
  await createTeamMembersTable();
  console.log("Done setting up Supabase tables.");
}

async function createUsersTable() {
  const { data, error } = await supabase.from("users").select("*").limit(1);

  if (error && error.details.includes('relation "users" does not exist')) {
    const { error } = await supabase.from("users").insert({
      id: "cjoqrr2id0000qepfgrstdw7o",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      image:
        "https://gravatar.com/avatar/c7f4d4b9546a55ab6f162f413b8c4769?s=400&d=robohash&r=x",
    });
    if (error) {
      console.error("Error creating user", error);
      return;
    }
    console.log("User created successfully.");
  } else {
    console.log("User table already exists.");
  }
}

async function createCharactersTable() {
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .limit(1);

  if (error && error.details.includes('relation "characters" does not exist')) {
    const { error } = await supabase.from("characters").insert([
      {
        id: "cjoqrs01p0003qepf6wz79gt4",
        name: "Thrall",
        class: "Shaman",
        spec: "Restoration",
        role: "Healer",
        realm: "Earthen Ring",
        userId: "cjoqrr2id0000qepfgrstdw7o",
      },
      {
        id: "cjoqrs2pb0004qepf9z70k9f3",
        name: "Varian Wrynn",
        class: "Warrior",
        spec: "Fury",
        role: "DPS",
        realm: "Earthen Ring",
        userId: "cjoqrr2id0000qepfgrstdw7o",
      },
    ]);
    if (error) {
      console.error("Error creating characters", error);
      return;
    }
    console.log("Characters created successfully.");
  } else {
    console.log("Characters table already exists.");
  }

  // add this return statement
  return;
}

async function createTeamMembersTable() {
  const { error } = await supabase.from("team_members").insert([
    {
      id: "cjoqrs01p0003qepf6wz79gt4",
      characterId: "cjoqrs01p0003qepf6wz79gt4",
      teamId: "cjoqrs01p0003qepf6wz79gt4",
      status: "confirmed",
    },
    {
      id: "cjoqrs2pb0004qepf9z70k9f3",
      characterId: "cjoqrs2pb0004qepf9z70k9f3",
      teamId: "cjoqrs2pb0004qepf9z70k9f3",
      status: "pending",
    },
  ]);

  if (
    error &&
    error.details.includes('relation "team_members" does not exist')
  ) {
    const { error } = await supabase.from("team_members").insert({
      id: "cjoqrs2pb0004qepf9z70k9f3",
      characterId: "cjoqrs2pb0004qepf9z70k9f3",
      teamId: "cjoqrs2pb0004qepf9z70k9f3",
      status: "pending",
    });
    if (error) {
      console.error("Error creating team members", error);
      return;
    }
    console.log("Team members table created successfully.");
  } else if (error) {
    console.error("Error creating team members", error);
    return;
  } else {
    console.log("Team members table already exists.");
  }
}
