interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  created_at: string;
}

interface Character {
  id: string;
  name: string;
  class: string;
  spec: string;
  role: string;
  realm: string;
  user_id: string;
  created_at: string;
}

interface Team {
  id: string;
  name: string;
  type: "MYTHIC_PLUS" | "RAIDING";
  leader_id: string;
  created_at: string;
}

interface TeamMember {
  id: string;
  character_id: string;
  team_id: string;
  status: string;
}

export const definitions = {
  User,
  Character,
  Team,
  TeamMember,
};
