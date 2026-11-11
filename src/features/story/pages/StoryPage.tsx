
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, BookOpen, Cog, Factory, FileSearch, Fingerprint, FolderOpen, Radar, RefreshCw, ScanLine, Search, ShieldAlert, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/story.css";

type StoryStatus = "loading" | "success" | "empty" | "error" | "invalid-data";

interface HistoriaApi {
  pkHistoria: number;
  fkMediaPortada: number | null;
  titulo: string;
  slug: string;
  contenido: string;
  orden: number;
}

interface StoryState {
  historias: HistoriaApi[];
  status: StoryStatus;
  statusCode?: number;
  errorMessage?: string;
}

interface StoryChapter {
  titulo: string;
  parrafos: string[];
}

const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

const chapterIcons = [Factory, Zap, ShieldAlert, Cog];
const chapterColors = ["#d99448", "#28d5cf", "#e45d46", "#d99448"];

function isValidHistorias(data: unknown): data is HistoriaApi[] {
  if (!Array.isArray(data)) return false;
  return data.every((item) => {
    if (typeof item !== "object" || item === null) return false;
    const historia = item as Record<string, unknown>;
    return (
      typeof historia.pkHistoria === "number" &&
      (historia.fkMediaPortada === null || typeof historia.fkMediaPortada === "number") &&
      typeof historia.titulo === "string" &&
      typeof historia.slug === "string" &&
      typeof historia.contenido === "string" &&
      typeof historia.orden === "number"
    );
  });
}

function getHttpErrorMessage(statusCode?: number): string {
  if (statusCode === undefined) return "No fue posible conectar con el servidor. Comprueba tu conexión.";
  switch (statusCode) {
    case 400: return "La solicitud no es válida.";
    case 401: return "Necesitas iniciar sesión para consultar estas historias.";
    case 403: return "No tienes permisos para consultar este contenido.";
    case 404: return "No se encontró el recurso de historias solicitado.";
    case 429: return "Se han realizado demasiadas solicitudes. Inténtalo más tarde.";
    case 500: return "El servidor encontró un error interno.";
    case 502:
    case 503:
    case 504: return "El servicio no está disponible temporalmente.";
    default: return statusCode >= 500 ? "Ocurrió un error en el servidor." : "No se pudieron recuperar las historias.";
  }
}

function parseStoryContent(content: string): StoryChapter[] {
  const normalized = content.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const headingPattern = /^(PREMISA|SINOPSIS|CONTEXTO|ANTECEDENTES|DESARROLLO|CONSECUENCIAS|EPÍLOGO|EPILOGO)$/gim;
  const matches = [...normalized.matchAll(headingPattern)];

  if (matches.length === 0) {
    return [{
      titulo: "RELATO HISTÓRICO",
      parrafos: normalized.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
    }];
  }

  const chapters: StoryChapter[] = [];

  if (matches[0].index !== undefined && matches[0].index > 0) {
    const introduction = normalized.slice(0, matches[0].index).trim();
    if (introduction) {
      chapters.push({
        titulo: "INTRODUCCIÓN",
        parrafos: introduction.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
      });
    }
  }

  matches.forEach((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index ?? normalized.length : normalized.length;
    const sectionContent = normalized.slice(start, end).trim();

    const parrafos = sectionContent
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    if (parrafos.length > 0) {
      chapters.push({
        titulo: match[0].toUpperCase(),
        parrafos,
      });
    }
  });

  return chapters;
}

export default function StoryPage() {
  const [story, setStory] = useState<StoryState>({
    historias: [],
    status: "loading",
  });
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchHistorias() {
      setStory({ historias: [], status: "loading" });

      try {
        if (!API_URL) throw new Error("No se encontró la variable VITE_API_URL en la configuración.");

        const response = await fetch(`${API_URL}/historias`, {
          method: "GET",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          setStory({
            historias: [],
            status: "error",
            statusCode: response.status,
          });
          return;
        }

        const data: unknown = await response.json();

        if (!isValidHistorias(data)) {
          setStory({
            historias: [],
            status: "invalid-data",
            errorMessage: "La respuesta de la API no coincide con la estructura esperada.",
          });
          return;
        }

        const historias = [...data].sort(
          (a, b) => a.orden - b.orden || a.pkHistoria - b.pkHistoria,
        );

        setStory({
          historias,
          status: historias.length ? "success" : "empty",
        });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;

        setStory({
          historias: [],
          status: "error",
          errorMessage: error instanceof Error ? error.message : getHttpErrorMessage(),
        });
      }
    }

    void fetchHistorias();
    return () => controller.abort();
  }, [retryKey]);

  const historias = story.historias;

  const totalChapters = useMemo(
    () => historias.reduce((total, item) => total + parseStoryContent(item.contenido).length, 0),
    [historias],
  );

  return (
    <main className="story-page">
      <div className="story-background-grid" aria-hidden="true" />

      <div className="story-container">
        <Link to="/" className="story-back">
          <ArrowLeft size={17} />
          VOLVER AL INICIO
        </Link>

        <motion.header
          className="story-hero"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="story-hero-copy">
            <span className="story-file-tag">
              <span className="story-status-light" />
              ARCHIVO DE METRONIA / HISTORIA
            </span>

            <p className="story-eyebrow">EXPEDIENTE HISTÓRICO // VAPORLOCK</p>

            <h1>
              HISTORIA
              <br />
              <span>DE METRONIA</span>
            </h1>

            <div className="story-title-divider">
              <span />
              <span />
              <span />
            </div>

            <p className="story-intro">
              Toda ciudad tiene un pasado. El de Metronia está marcado por
              la ambición, el progreso industrial y un conflicto que cambiará
              su futuro para siempre.
            </p>

            <div className="story-hero-footer">
              <span>REGISTRO HISTÓRICO</span>
              <span>METRONIA // 2943</span>
            </div>
          </div>

          <div className="story-hero-art">
            <div className="story-art-topline">
              <span><span className="story-status-light" /> ARCHIVO ACTIVO</span>
              <span>MT // 2943</span>
            </div>
            <div className="story-art-grid" />
            <div className="story-art-orbit story-art-orbit-one" />
            <div className="story-art-orbit story-art-orbit-two" />
            <Cog className="story-art-gear story-art-gear-one" />
            <Cog className="story-art-gear story-art-gear-two" />
            <div className="story-art-core">
              <div className="story-art-core-frame">
                <Factory size={78} strokeWidth={1} />
              </div>
              <span>METRONIA</span>
              <strong>VL</strong>
              <small>ARCHIVO HISTÓRICO</small>
            </div>
            <div className="story-art-bottom">
              <span>ORIGEN</span>
              <span>CONFLICTO</span>
              <span>REVOLUCIÓN</span>
            </div>
            <div className="story-art-caption">
              <span>VAPORLOCK / ARCHIVO VISUAL</span>
              <span>ACCESO REGISTRADO</span>
            </div>
          </div>
        </motion.header>

        <section className="story-content-section">
          <div className="story-section-heading">
            <div>
              <span className="story-section-kicker">CRÓNICA DE METRONIA</span>
              <h2>EL ORIGEN DEL CONFLICTO</h2>
              <p>Los acontecimientos que dieron forma al destino de la ciudad.</p>
            </div>
            <div className="story-record-count">
              <strong>{String(historias.length).padStart(2, "0")}</strong>
              <span>HISTORIAS</span>
            </div>
          </div>

          {story.status === "loading" && (
            <div className="story-feedback" role="status">
              <RefreshCw size={28} />
              <h3>RECUPERANDO ARCHIVOS</h3>
              <p>Consultando los registros históricos de Metronia.</p>
            </div>
          )}

          {story.status === "empty" && (
            <div className="story-feedback" role="status">
              <BookOpen size={34} />
              <h3>NO HAY HISTORIAS DISPONIBLES</h3>
              <p>Los registros históricos aparecerán aquí cuando se publiquen.</p>
            </div>
          )}

          {(story.status === "error" || story.status === "invalid-data") && (
            <div className="story-feedback story-feedback-error" role="alert">
              <RefreshCw size={28} />
              <div>
                <h3>NO SE PUDIERON RECUPERAR LOS REGISTROS</h3>
                <p>{story.errorMessage ?? getHttpErrorMessage(story.statusCode)}</p>
                {story.statusCode !== undefined && <span>HTTP {story.statusCode}</span>}
                <button
                  type="button"
                  className="story-retry"
                  onClick={() => setRetryKey((current) => current + 1)}
                >
                  REINTENTAR <RefreshCw size={15} />
                </button>
              </div>
            </div>
          )}

          {story.status === "success" && (
            <>
              <div className="story-reading-meta">
                <span><BookOpen size={15} /> {totalChapters} SECCIONES NARRATIVAS</span>
                <span>METRONIA · AÑO 2943</span>
              </div>

              {historias.map((historia, index) => {
                const chapters = parseStoryContent(historia.contenido);
                // Imagen local compartida desde public/images.
                // Vite sirve los archivos de public desde la raíz del sitio.
                const coverUrl = "/images/metronia-banner.webp";

                return (
                  <motion.article
                    className="story-article"
                    key={historia.pkHistoria}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.08 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="story-article-heading">
                      <div>
                        <span className="story-article-kicker">
                          ARCHIVO {String(index + 1).padStart(3, "0")} / DOCUMENTO HISTÓRICO
                        </span>
                        <h3>{historia.titulo}</h3>
                      </div>
                      <span className="story-article-year">2943</span>
                    </div>

                    <div className="story-cover">
                        <img
                          src={coverUrl}
                          alt={`Portada de ${historia.titulo}`}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.parentElement?.classList.add("story-cover--error");
                            event.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="story-cover-caption">
                          <span>METRONIA // REGISTRO VISUAL</span>
                          <span>VL-{String(historia.pkHistoria).padStart(3, "0")}</span>
                        </div>
                    </div>

                    <div className="story-reading-layout">
                      <aside className="story-chapter-index">
                        <span>CONTENIDO</span>
                        {chapters.map((chapter, chapterIndex) => (
                          <a
                            key={`${historia.pkHistoria}-${chapterIndex}`}
                            href={`#story-${historia.pkHistoria}-${chapterIndex}`}
                          >
                            <span>{String(chapterIndex + 1).padStart(2, "0")}</span>
                            {chapter.titulo}
                          </a>
                        ))}
                      </aside>

                      <div className="story-narrative">
                        {chapters.map((chapter, chapterIndex) => {
                          const Icon = chapterIcons[chapterIndex % chapterIcons.length];
                          const color = chapterColors[chapterIndex % chapterColors.length];

                          return (
                            <motion.section
                              className="story-chapter story-folder"
                              id={`story-${historia.pkHistoria}-${chapterIndex}`}
                              key={`${historia.pkHistoria}-${chapterIndex}`}
                              style={{ "--chapter-color": color } as React.CSSProperties}
                              initial={{ opacity: 0, y: 35, rotateX: -8, scale: 0.97 }}
                              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                              viewport={{ once: true, amount: 0.12 }}
                              transition={{ duration: 0.75, delay: Math.min(chapterIndex * 0.12, 0.36), ease: [0.22, 1, 0.36, 1] }}
                            >
                              <div className="story-folder-tab" aria-hidden="true">
                                <FolderOpen size={14} />
                                <span>EXPEDIENTE ABIERTO // {String(chapterIndex + 1).padStart(2, "0")}</span>
                              </div>
                              <div className="story-chapter-heading">
                                <span className="story-chapter-number">
                                  {String(chapterIndex + 1).padStart(2, "0")}
                                </span>
                                <div>
                                  <span>REGISTRO NARRATIVO</span>
                                  <h4>{chapter.titulo}</h4>
                                </div>
                                <Icon size={25} strokeWidth={1.5} />
                              </div>

                              <div className="story-chapter-body">
                                <div className="story-scan-track" aria-hidden="true">
                                  <div className="story-scan-lens">
                                    <Search size={25} strokeWidth={1.4} />
                                  </div>
                                  <span>ESCÁNER DE ARCHIVO ACTIVO</span>
                                </div>
                                <div className="story-reading-tools" aria-hidden="true">
                                  <div className="story-reading-tools-label">
                                    <FileSearch size={17} strokeWidth={1.7} />
                                    <span>LECTURA DEL EXPEDIENTE</span>
                                  </div>
                                  <div className="story-reading-signal">
                                    <Radar size={17} strokeWidth={1.6} />
                                    <span>SEÑAL ESTABLE</span>
                                    <i />
                                  </div>
                                </div>

                                <div className="story-fragments">
                                  {chapter.parrafos.map((paragraph, paragraphIndex) => {
                                    const isLead = paragraphIndex === 0;
                                    const remainingFragments = Math.max(chapter.parrafos.length - 1, 0);
                                    const isLastUnpairedFragment =
                                      !isLead &&
                                      paragraphIndex === chapter.parrafos.length - 1 &&
                                      remainingFragments % 2 === 1;
                                    const FragmentIcon = isLead ? ScanLine : Search;

                                    return (
                                      <motion.article
                                        key={paragraphIndex}
                                        initial={{ opacity: 0, y: 22, scale: 0.96 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true, amount: 0.18 }}
                                        transition={{ duration: 0.52, delay: Math.min(paragraphIndex * 0.09, 0.45), ease: [0.22, 1, 0.36, 1] }}
                                        className={[
                                          "story-fragment",
                                          isLead ? "story-fragment--lead" : "",
                                          isLastUnpairedFragment ? "story-fragment--solo" : "",
                                        ].filter(Boolean).join(" ")}
                                      >
                                        <div className="story-fragment-topline">
                                          <span className="story-fragment-icon">
                                            <FragmentIcon size={17} strokeWidth={1.8} />
                                          </span>
                                          <span className="story-fragment-label">
                                            {isLead
                                              ? "HALLAZGO PRINCIPAL"
                                              : `FRAGMENTO / ${String(paragraphIndex).padStart(2, "0")}`}
                                          </span>
                                          <span className="story-fragment-code">
                                            VL-{String(historia.pkHistoria).padStart(3, "0")}-{String(chapterIndex + 1).padStart(2, "0")}-{String(paragraphIndex + 1).padStart(2, "0")}
                                          </span>
                                        </div>
                                        <p>{paragraph}</p>
                                        <span className="story-fragment-corner" aria-hidden="true">
                                          <Fingerprint size={24} strokeWidth={1.2} />
                                        </span>
                                      </motion.article>
                                    );
                                  })}
                                </div>

                                <div className="story-reading-footnote" aria-hidden="true">
                                  <span><span className="story-reading-footnote-dot" /> ARCHIVO VERIFICADO</span>
                                  <span>FIN DE SECCIÓN // MT-{String(chapterIndex + 1).padStart(2, "0")}</span>
                                </div>
                              </div>
                            </motion.section>
                          );
                        })}
                      </div>
                    </div>

                    <div className="story-article-footer">
                      <span>FIN DEL REGISTRO</span>
                      <span>ARCHIVO // {String(historia.pkHistoria).padStart(3, "0")}</span>
                    </div>
                  </motion.article>
                );
              })}
            </>
          )}
        </section>

        <section className="story-closing">
          <div className="story-closing-pattern" />
          <div className="story-closing-copy">
            <span>EL DESTINO DE METRONIA ESTÁ EN JUEGO</span>
            <h2>CONOCE A LOS IMPLICADOS</h2>
            <p>Descubre a Jack Veil, Lucius Corr y los personajes que forman parte de este conflicto.</p>
          </div>
          <Link to="/personajes" className="story-closing-button">
            VER PERSONAJES <ArrowRight size={18} />
          </Link>
        </section>

        <footer className="story-footer">
          <span>VAPORLOCK</span>
          <span>ARCHIVO HISTÓRICO DE METRONIA</span>
          <span>2943 // VL</span>
        </footer>
      </div>
    </main>
  );
}
