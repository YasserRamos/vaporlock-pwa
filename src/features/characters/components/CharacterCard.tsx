import { ArrowUpRight, Heart, Shield, Swords } from "lucide-react";
import type { Character } from "../types/character.types";

const roleColors: Record<string, string> = {
  Protagonista: "bg-[#e38a42] text-[#11131a]",
  NPC: "bg-[#5ca8a0] text-[#11131a]",
  Enemigo: "bg-[#343b51] text-[#f4e8cf]",
  "Sub-jefe": "bg-[#bd7637] text-[#11131a]",
  "Jefe final": "bg-[#bd4034] text-white",
};

type Props = {
  character: Character;
  onSelect: (character: Character) => void;
};

export default function CharacterCard({ character, onSelect }: Props) {
  return (
    <article className="group flex h-full flex-col border-[3px] border-black bg-[#1c202a] shadow-[5px_5px_0_#08090d] transition-transform duration-200 hover:-translate-y-1">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b-[3px] border-black bg-[#252b37]">
        <div className="pixel-texture absolute inset-0 opacity-60" />
        <span className="relative comic-heading text-center text-4xl text-[#f4e8cf] sm:text-5xl">
          {character.name
            .split(/[\s-]+/)
            .map((part) => part[0])
            .join("")
            .slice(0, 3)}
        </span>
        <span className={`absolute left-3 top-3 border-2 border-black px-2 py-1 text-[9px] font-black uppercase tracking-wider ${roleColors[character.role]}`}>
          {character.role}
        </span>
        <span className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 text-[10px] font-bold text-[#f4e8cf]">
          {character.id}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-xl font-black uppercase leading-tight text-[#f4e8cf]">
          {character.name}
        </h3>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[#d2c8b7]">
          <span className="inline-flex items-center gap-1 border border-white/15 px-2 py-1">
            <Heart size={13} className="text-[#bd4034]" />
            HP: {character.hp ?? "Sin definir"}
          </span>
          <span className="inline-flex items-center gap-1 border border-white/15 px-2 py-1">
            <Shield size={13} className="text-[#5ca8a0]" />
            {character.aggressiveness}
          </span>
        </div>

        <p className="mt-4 text-xs leading-5 text-[#b8b1a3]">
          <span className="font-black uppercase text-[#e38a42]">Aparición: </span>
          {character.appearance.join(" / ")}
        </p>

        <button
          type="button"
          onClick={() => onSelect(character)}
          className="comic-button mt-5 w-full bg-[#f4e8cf] text-sm text-[#11131a]"
        >
          Ver ficha <ArrowUpRight size={17} />
        </button>
      </div>
    </article>
  );
}
