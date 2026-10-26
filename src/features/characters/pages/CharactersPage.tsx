
import { useMemo, useState } from "react";
import { Search, Users, X } from "lucide-react";
import { characters } from "../data/characters";
import type { Character, CharacterRole } from "../types/character.types";
import CharacterCard from "../components/CharacterCard";
import CharacterDetails from "../components/CharacterDetails";
import "../css/charactersPage.css";

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
      const matchesRole =
        role === "Todos" || character.role === (role as CharacterRole);

      const matchesLevel =
        level === "Todos" || character.appearance.includes(level);

      const matchesSearch =
        !query ||
        character.name.toLocaleLowerCase().includes(query) ||
        character.id.toLocaleLowerCase().includes(query) ||
        character.abilities.some((ability) =>
          ability.toLocaleLowerCase().includes(query)
        );

      return matchesRole && matchesLevel && matchesSearch;
    });
  }, [role, level, search]);

  const resetFilters = () => {
    setRole("Todos");
    setLevel("Todos");
    setSearch("");
  };

  return (
    <section id="personajes" className="characters-page">
      <div className="characters-container">
        <header className="characters-header">
          <p className="characters-eyebrow">
            <span className="characters-status-dot" />
            ARCHIVO DE METRONIA / BASE DE DATOS
          </p>

          <h2 className="characters-title">
            PERSONAJES <span>//</span> AMENAZAS
          </h2>

          <p className="characters-description">
            Consulta los personajes registrados de Vaporlock, sus roles,
            apariciones, acciones, habilidades y puntos de salud.
          </p>
        </header>

        <div className="characters-filters">
          <div className="characters-search-section">
            <label htmlFor="character-search">
              <Search size={15} />
              Buscar en los archivos
            </label>

            <div className="characters-search-box">
              <Search
                size={19}
                className="characters-search-icon"
                aria-hidden="true"
              />

              <input
                id="character-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nombre, ID o habilidad..."
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Limpiar búsqueda"
                  className="characters-clear-search"
                >
                  <X size={17} />
                </button>
              )}
            </div>
          </div>

          <div className="characters-filter-group">
            <p>Clasificación por rol</p>

            <div className="characters-filter-options">
              {roles.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setRole(item)}
                  aria-pressed={role === item}
                  className={`characters-filter-button ${
                    role === item ? "is-active role-active" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="characters-filter-group">
            <p>Registro de aparición</p>

            <div className="characters-filter-options">
              {levels.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setLevel(item)}
                  aria-pressed={level === item}
                  className={`characters-filter-button ${
                    level === item ? "is-active level-active" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {(search || role !== "Todos" || level !== "Todos") && (
            <button
              type="button"
              className="characters-reset-filters"
              onClick={resetFilters}
            >
              <X size={14} />
              Restablecer filtros
            </button>
          )}
        </div>

        <div className="characters-results-heading">
          <p>
            <Users size={16} />
            Archivos encontrados
          </p>

          <span className="characters-results-count">
            {filtered.length} / {characters.length}
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="characters-grid">
            {filtered.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onSelect={setSelected}
              />
            ))}
          </div>
        ) : (
          <div className="characters-empty">
            <Search size={28} />
            <h3>Sin resultados</h3>
            <p>No hay personajes que coincidan con esos filtros.</p>

            <button
              type="button"
              onClick={resetFilters}
              className="characters-empty-button"
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
