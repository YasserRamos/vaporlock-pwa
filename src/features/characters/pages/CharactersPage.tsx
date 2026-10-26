import { useMemo, useState } from "react";
import { Search, Users, X } from "lucide-react";
import { characters } from "../data/characters";
import type { Character, CharacterRole } from "../types/character.types";
import CharacterCard from "../components/CharacterCard";
import CharacterDetails from "../components/CharacterDetails";

const roles = [
  "Todos",
  "Protagonista",
  "NPC",
  "Enemigo",
  "Sub-jefe",
  "Jefe final",
] as const;

const levels = ["Todos", "Nivel 1", "Nivel 2", "Nivel 3", "Tutorial"] as const;

export default function CharactersPage() {
  const [role, setRole] = useState<(typeof roles)[number]>("Todos");
  const [level, setLevel] = useState<(typeof levels)[number]>("Todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Character | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return characters.filter((character) => {
      const matchesRole = role === "Todos" || character.role === (role as CharacterRole);
      const matchesLevel = level === "Todos" || character.appearance.includes(level);
      const matchesSearch =
        !query ||
        character.name.toLocaleLowerCase().includes(query) ||
        character.id.toLocaleLowerCase().includes(query) ||
        character.abilities.some((ability) => ability.toLocaleLowerCase().includes(query));

      return matchesRole && matchesLevel && matchesSearch;
    });
  }, [role, level, search]);

  return (
    <section id="personajes" className="border-y-4 border-black bg-[#191c25]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#e38a42]">
            Archivo de Metronia / Base de datos
          </p>
          <h2 className="comic-heading text-4xl text-[#f4e8cf] sm:text-5xl md:text-6xl">
            PERSONAJES
            <span className="text-[#bd4034]"> // </span>
            AMENAZAS
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#b8b1a3] sm:text-base">
            Consulta los personajes registrados de Vaporlock, sus roles,
            apariciones, acciones, habilidades y puntos de salud.
          </p>
        </div>

        <div className="mb-7 border-2 border-black bg-[#11131a] p-4 sm:p-5">
          <label htmlFor="character-search" className="mb-2 block text-xs font-black uppercase tracking-widest text-[#e38a42]">
            Buscar en los archivos
          </label>
          <div className="flex items-center gap-2 border-2 border-[#4a4d56] bg-[#1c202a] px-3">
            <Search size={18} className="shrink-0 text-[#b8b1a3]" />
            <input
              id="character-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nombre, ID o habilidad..."
              className="min-h-12 w-full bg-transparent text-sm text-[#f4e8cf] outline-none placeholder:text-[#777b85]"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} aria-label="Limpiar busqueda">
                <X size={17} />
              </button>
            )}
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#b8b1a3]">Filtrar por rol</p>
            <div className="flex flex-wrap gap-2">
              {roles.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setRole(item)}
                  aria-pressed={role === item}
                  className={`border-2 border-black px-3 py-2 text-xs font-black uppercase transition-colors ${
                    role === item
                      ? "bg-[#bd4034] text-white"
                      : "bg-[#252b37] text-[#d2c8b7] hover:bg-[#343b51]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#b8b1a3]">Filtrar por aparición</p>
            <div className="flex flex-wrap gap-2">
              {levels.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setLevel(item)}
                  aria-pressed={level === item}
                  className={`border-2 border-black px-3 py-2 text-xs font-black uppercase transition-colors ${
                    level === item
                      ? "bg-[#e38a42] text-[#11131a]"
                      : "bg-[#252b37] text-[#d2c8b7] hover:bg-[#343b51]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b8b1a3]">
            <Users size={16} /> Archivos encontrados
          </p>
          <span className="border-2 border-black bg-[#e38a42] px-3 py-1 text-sm font-black text-[#11131a]">
            {filtered.length} / {characters.length}
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onSelect={setSelected}
              />
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-white/20 px-5 py-12 text-center">
            <p className="text-lg font-black uppercase">Sin resultados</p>
            <p className="mt-2 text-sm text-[#b8b1a3]">
              No hay personajes que coincidan con esos filtros.
            </p>
            <button
              type="button"
              onClick={() => {
                setRole("Todos");
                setLevel("Todos");
                setSearch("");
              }}
              className="comic-button mt-5 bg-[#f4e8cf] text-[#11131a]"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      <CharacterDetails
        character={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
