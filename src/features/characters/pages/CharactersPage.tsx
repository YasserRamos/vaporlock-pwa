
import { useEffect, useMemo, useState } from "react";
import { Search, Users, X } from "lucide-react";
import type { Character, CharacterRole } from "../types/character.types";
import CharacterCard from "../components/CharacterCard";
import CharacterDetails from "../components/CharacterDetails";
import "../css/charactersPage.css";

type PersonajeApi = {
  pkPersonaje: number;
  fkMediaPortada: number | null;
  nombre: string;
  slug: string;
  descripcion: string | null;
  historia: string | null;
  rol: string;
  puntosSalud: number | null;
  agresividad: string | null;
  urlRetrato: string | null;
  apariciones: string[];
  acciones: string[];
  habilidades: string[];
};

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [role, setRole] = useState("Todos");
  const [level, setLevel] = useState("Todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Character | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const obtenerPersonajes = async () => {
      try {
        if (!API_URL) {
          throw new Error(
            "No se ha configurado la variable VITE_API_URL."
          );
        }

        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/personajes`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Error al obtener personajes: HTTP ${response.status}`
          );
        }

        const data: PersonajeApi[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "La respuesta de la API no tiene el formato esperado."
          );
        }

        const apiOrigin = new URL(API_URL).origin;

        const personajesAdaptados: Character[] = data.map((personaje) => ({
          id: String(personaje.pkPersonaje),
          name: personaje.nombre,
          role: personaje.rol as CharacterRole,

          portraitUrl: personaje.urlRetrato
            ? new URL(personaje.urlRetrato, apiOrigin).toString()
            : null,

          aggressiveness: personaje.agresividad ?? "Sin información",
          appearance: personaje.apariciones ?? [],
          actions: personaje.acciones ?? [],
          abilities: personaje.habilidades ?? [],

          hp:
            personaje.puntosSalud !== null
              ? String(personaje.puntosSalud)
              : null,

          description: personaje.descripcion ?? "",
        }));

        setCharacters(personajesAdaptados);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Ocurrió un error al cargar los personajes."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    obtenerPersonajes();

    return () => controller.abort();
  }, []);

  // FILTROS GENERADOS A PARTIR DE LOS DATOS DE LA API

  const roles = useMemo(() => {
    const uniqueRoles = [
      ...new Set(characters.map((character) => character.role)),
    ]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    return ["Todos", ...uniqueRoles];
  }, [characters]);

  const levels = useMemo(() => {
    const uniqueAppearances = [
      ...new Set(
        characters.flatMap((character) => character.appearance ?? [])
      ),
    ]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    return ["Todos", ...uniqueAppearances];
  }, [characters]);

  // BÚSQUEDA Y FILTRADO

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return characters.filter((character) => {
      const matchesRole =
        role === "Todos" || character.role === role;

      const matchesLevel =
        level === "Todos" ||
        (character.appearance ?? []).includes(level);

      const matchesSearch =
        !query ||
        character.name.toLocaleLowerCase().includes(query) ||
        character.id.toLocaleLowerCase().includes(query) ||
        (character.abilities ?? []).some((ability) =>
          ability.toLocaleLowerCase().includes(query)
        );

      return matchesRole && matchesLevel && matchesSearch;
    });
  }, [characters, role, level, search]);

  // RESTABLECER FILTROS

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

        {loading ? (
          <div className="characters-empty">
            <p>Cargando archivos de personajes...</p>
          </div>
        ) : error ? (
          <div className="characters-empty">
            <h3>Error de conexión</h3>
            <p>{error}</p>
          </div>
        ) : filtered.length > 0 ? (
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
