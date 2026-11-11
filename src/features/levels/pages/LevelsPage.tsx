
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Map, ImageOff, Clock3, ShieldAlert, Target, ChevronDown, Route, Crosshair, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/levels.css";

interface Nivel {
  pkNivel: number;
  fkMediaPortada: number | null;
  nombre: string;
  slug: string;
  descripcion: string | null;
  orden: number;
}

interface LevelContent {
  objetivo: string;
  dificultad: string;
  duracion: string;
  mecanicasIntroducidas: string;
  mecanicasUtilizadas: string;
  amenazas: string;
  objetivosDestruccion: string;
  recompensa: string;
  puntosGuardado: string;
  condicionEntrada: string;
  condicionSalida: string;
  eventoNarrativo: string;
  enfrentamiento: string;
  estructura: string;
  recorrido: string;
}

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

const EMPTY_CONTENT: LevelContent = {
  objetivo: "",
  dificultad: "Sin determinar",
  duracion: "No especificada",
  mecanicasIntroducidas: "",
  mecanicasUtilizadas: "",
  amenazas: "",
  objetivosDestruccion: "",
  recompensa: "",
  puntosGuardado: "",
  condicionEntrada: "",
  condicionSalida: "",
  eventoNarrativo: "",
  enfrentamiento: "",
  estructura: "",
  recorrido: "",
};

const FIELD_MAP: Record<string, keyof LevelContent> = {
  "dificultad": "dificultad",
  "duración estimada": "duracion",
  "duracion estimada": "duracion",
  "mecánicas introducidas": "mecanicasIntroducidas",
  "mecanicas utilizadas": "mecanicasUtilizadas",
  "enemigos y obstáculos": "amenazas",
  "enemigos / obstáculos": "amenazas",
  "objetivos de destrucción": "objetivosDestruccion",
  "recompensa": "recompensa",
  "puntos de guardado": "puntosGuardado",
  "condición de entrada": "condicionEntrada",
  "condición de salida": "condicionSalida",
  "evento narrativo": "eventoNarrativo",
  "enfrentamiento final": "enfrentamiento",
  "estructura": "estructura",
  "recorrido": "recorrido",
};

function parseLevelDescription(description: string | null): LevelContent {
  if (!description) return EMPTY_CONTENT;
  const content = { ...EMPTY_CONTENT };
  const lines = description.split(/\r?\n/);
  const objectiveLines: string[] = [];
  let currentField: keyof LevelContent | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    const match = line.match(/^([^:]+):\s*(.*)$/);

    if (match) {
      const key = match[1].trim().toLocaleLowerCase("es");
      const field = FIELD_MAP[key];

      if (field) {
        currentField = field;
        content[field] = match[2].trim();
        continue;
      }
    }

    if (currentField) {
      content[currentField] = `${content[currentField]} ${line}`.trim();
    } else {
      objectiveLines.push(line);
    }
  }

  content.objetivo = objectiveLines.join(" ").replace(/^#+\s*/, "").trim();
  return content;
}

function splitItems(value: string): string[] {
  return value
    .split(/[,;]+/)
    .map((item) => item.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);
}

function getDifficultyClass(value: string): string {
  const difficulty = value.toLocaleLowerCase("es");
  if (difficulty.includes("fácil") || difficulty.includes("facil")) return "easy";
  if (difficulty.includes("intermedia") || difficulty.includes("media")) return "medium";
  if (difficulty.includes("alta") || difficulty.includes("difícil")) return "hard";
  return "default";
}

export default function LevelsPage() {
  const [levels, setLevels] = useState<Nivel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchLevels = async () => {
      if (!API_URL) {
        setError("No se ha configurado la URL de la API.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/niveles`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Error al obtener los niveles. Código: ${response.status}`);
        }

        const data: Nivel[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("La respuesta de la API no tiene un formato válido.");
        }

        setLevels(data.sort((a, b) => a.orden - b.orden));
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "No se pudieron cargar los niveles.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchLevels();
    return () => controller.abort();
  }, []);

  const publishedLevels = useMemo(
    () => levels.filter((level) => level.nombre && level.slug),
    [levels],
  );

  const getCoverUrl = (mediaId: number | null): string | null => {
    if (!mediaId || !API_URL) return null;
    return `${API_URL}/media/${mediaId}`;
  };

  return (
    <main className="levels-page">
      <div className="levels-background" aria-hidden="true" />
      <div className="levels-container">
        <Link to="/" className="levels-back">
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>

        <motion.header
          className="levels-header"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="levels-heading">
            <span className="levels-eyebrow">
              <Map size={15} />
              ZONAS DE OPERACIÓN
            </span>
            <h1>LOS <span>NIVELES</span></h1>
            <p>
              Explora los escenarios, objetivos y desafíos que conforman la
              operación de Metronia.
            </p>
          </div>

          <div className="levels-counter">
            <span>OPERACIONES REGISTRADAS</span>
            <strong>{loading ? "--" : String(publishedLevels.length).padStart(2, "0")}</strong>
            <div className="levels-counter-bars">
              {publishedLevels.map((level) => (
                <i key={level.pkNivel} />
              ))}
            </div>
          </div>
        </motion.header>

        <section className="levels-section">
          <div className="levels-section-heading">
            <div>
              <span className="levels-section-label">ARCHIVO DE OPERACIONES</span>
              <h2>Selección de nivel</h2>
              <p>Expedientes de las zonas de intervención registradas.</p>
            </div>
            <span className="levels-total">
              {loading ? "CARGANDO..." : `${String(publishedLevels.length).padStart(2, "0")} REGISTROS`}
            </span>
          </div>

          {loading && <div className="levels-feedback">Cargando expedientes...</div>}
          {!loading && error && (
            <div className="levels-feedback levels-feedback--error">{error}</div>
          )}
          {!loading && !error && publishedLevels.length === 0 && (
            <div className="levels-feedback">No hay niveles publicados disponibles.</div>
          )}

          {!loading && !error && publishedLevels.length > 0 && (
            <div className="levels-grid">
              {publishedLevels.map((level, index) => {
                const coverUrl = getCoverUrl(level.fkMediaPortada);
                const content = parseLevelDescription(level.descripcion);
                const mechanics = splitItems(content.mecanicasUtilizadas || content.mecanicasIntroducidas);
                const threats = splitItems(content.amenazas);
                const accent = ["#e6a34b", "#43c8bd", "#d77c55"][index % 3];

                return (
                  <motion.article
                    className="level-card"
                    key={level.pkNivel}
                    style={{ "--level-color": accent } as React.CSSProperties}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="level-cover">
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={`Escenario de ${level.nombre}`}
                          className="level-card-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="level-cover-placeholder">
                          <ImageOff size={30} strokeWidth={1.3} />
                          <span>IMAGEN DEL ESCENARIO</span>
                        </div>
                      )}
                      <div className="level-cover-overlay" />
                      <span className="level-number">
                        {String(level.orden).padStart(2, "0")}
                      </span>
                      <span className="level-cover-label">ZONA DE OPERACIÓN</span>
                    </div>

                    <div className="level-card-content">
                      <div className="level-card-heading">
                        <span className={`level-difficulty level-difficulty--${getDifficultyClass(content.dificultad)}`}>
                          <i />
                          {content.dificultad}
                        </span>
                        <span className="level-duration">
                          <Clock3 size={13} />
                          {content.duracion}
                        </span>
                      </div>

                      <h3>{level.nombre}</h3>

                      <div className="level-objective">
                        <span className="level-label">
                          <Target size={13} />
                          OBJETIVO PRINCIPAL
                        </span>
                        <p>{content.objetivo || "Información no disponible."}</p>
                      </div>

                      {mechanics.length > 0 && (
                        <div className="level-info-section">
                          <span className="level-label">MECÁNICAS</span>
                          <div className="level-tags">
                            {mechanics.map((item, i) => <span key={i}>{item}</span>)}
                          </div>
                        </div>
                      )}

                      {threats.length > 0 && (
                        <div className="level-info-section">
                          <span className="level-label">
                            <ShieldAlert size={13} />
                            AMENAZAS
                          </span>
                          <p className="level-compact-text">{threats.join(" · ")}</p>
                        </div>
                      )}

                      {content.recompensa && (
                        <div className="level-reward">
                          <Trophy size={15} />
                          <div>
                            <span>RECOMPENSA</span>
                            <p>{content.recompensa}</p>
                          </div>
                        </div>
                      )}

                      <details className="level-details">
                        <summary>
                          <span>CONSULTAR EXPEDIENTE COMPLETO</span>
                          <ChevronDown size={16} />
                        </summary>
                        <div className="level-details-content">
                          {content.mecanicasIntroducidas && (
                            <div>
                              <span className="level-label">MECÁNICAS INTRODUCIDAS</span>
                              <p>{content.mecanicasIntroducidas}</p>
                            </div>
                          )}
                          {content.objetivosDestruccion && (
                            <div>
                              <span className="level-label">OBJETIVOS DE DESTRUCCIÓN</span>
                              <p>{content.objetivosDestruccion}</p>
                            </div>
                          )}
                          {content.estructura && (
                            <div>
                              <span className="level-label">ESTRUCTURA DEL ESCENARIO</span>
                              <p>{content.estructura}</p>
                            </div>
                          )}
                          {content.enfrentamiento && (
                            <div>
                              <span className="level-label">ENFRENTAMIENTO</span>
                              <p>{content.enfrentamiento}</p>
                            </div>
                          )}
                          {content.puntosGuardado && (
                            <div>
                              <span className="level-label">PUNTOS DE GUARDADO</span>
                              <p>{content.puntosGuardado}</p>
                            </div>
                          )}
                          {content.condicionEntrada && (
                            <div>
                              <span className="level-label">CONDICIÓN DE ENTRADA</span>
                              <p>{content.condicionEntrada}</p>
                            </div>
                          )}
                          {content.condicionSalida && (
                            <div>
                              <span className="level-label">CONDICIÓN DE SALIDA</span>
                              <p>{content.condicionSalida}</p>
                            </div>
                          )}
                          {content.eventoNarrativo && (
                            <div>
                              <span className="level-label">CONTEXTO NARRATIVO</span>
                              <p>{content.eventoNarrativo}</p>
                            </div>
                          )}
                          {content.recorrido && (
                            <div className="level-route">
                              <span className="level-label">
                                <Route size={13} />
                                RECORRIDO
                              </span>
                              <p>{content.recorrido}</p>
                            </div>
                          )}
                        </div>
                      </details>
                    </div>

                    <div className="level-card-footer">
                      <Crosshair size={14} />
                      <span>VAPORIS INDUSTRIES</span>
                      <span className="level-footer-order">ORDEN {String(level.orden).padStart(2, "0")}</span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </section>

        <footer className="levels-footer">
          <span className="levels-footer-indicator" />
          <p>VAPORLOCK <span>/</span> ARCHIVO DE NIVELES</p>
          <span className="levels-footer-version">METRONIA · 2943</span>
        </footer>
      </div>
    </main>
  );
}
