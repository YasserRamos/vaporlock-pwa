export type CharacterRole =
  | "Protagonista"
  | "NPC"
  | "Enemigo"
  | "Sub-jefe"
  | "Jefe final";

export type Character = {
  id: string;
  name: string;
  role: CharacterRole;
  aggressiveness: string;
  appearance: string[];
  actions: string[];
  abilities: string[];
  hp: string | null;
  description: string;
};

