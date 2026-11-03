
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowDown,
  Cog,
  Factory,
  Zap,
  ShieldAlert,
  RefreshCw,
  BookOpen,
} from "lucide-react";
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

const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

const eventIcons = [Factory, Zap, ShieldAlert, Cog];
const eventColors = ["#d99448", "#28d5cf", "#e45d46", "#d99448"];

function isValidHistorias(data: unknown): data is HistoriaApi[] {
  if (!Array.isArray(data)) {
    return false;
  }

  return data.every((item) => {
    if (typeof item !== "object" || item === null) {
      return false;
    }

    const historia = item as Record<string, unknown>;

    return (
      typeof historia.pkHistoria === "number" &&
      (historia.fkMediaPortada === null ||
        typeof historia.fkMediaPortada === "number") &&
      typeof historia.titulo === "string" &&
      typeof historia.slug === "string" &&
      typeof historia.contenido === "string" &&
      typeof historia.orden === "number"
    );
  });
}

function getHttpErrorMessage(statusCode?: number): string {
  if (statusCode === undefined) {
    return "No fue posible conectar con el servidor. Comprueba tu conexión.";
  }

  switch (statusCode) {
    case 400:
      return "La solicitud no es válida.";
    case 401:
      return "Necesitas iniciar sesión para consultar estas historias.";
    case 403:
      return "No tienes permisos para consultar este contenido.";
    case 404:
      return "No se encontró el recurso de historias solicitado.";
    case 429:
      return "Se han realizado demasiadas solicitudes. Inténtalo más tarde.";
    case 500:
      return "El servidor encontró un error interno.";
    case 502:
    case 503:
    case 504:
      return "El servicio no está disponible temporalmente.";
    default:
      return statusCode >= 500
        ? "Ocurrió un error en el servidor."
        : "No se pudieron recuperar las historias.";
  }
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
      setStory({
        historias: [],
        status: "loading",
      });

      try {
        if (!API_URL) {
          throw new Error(
            "No se encontró la variable VITE_API_URL en la configuración.",
          );
        }

        const response = await fetch(`${API_URL}/historias`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
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
            errorMessage:
              "La respuesta de la API no coincide con la estructura esperada de HistoriaDto.",
          });
          return;
        }

        const historias = [...data].sort(
          (a, b) => a.orden - b.orden || a.pkHistoria - b.pkHistoria,
        );

        setStory({
          historias,
          status: historias.length > 0 ? "success" : "empty",
        });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setStory({
          historias: [],
          status: "error",
          errorMessage:
            error instanceof Error
              ? error.message
              : getHttpErrorMessage(),
        });
      }
    }

    void fetchHistorias();

    return () => {
      controller.abort();
    };
  }, [retryKey]);

  const historias = story.historias;

  return (
    <main className="story-page">
      <div className="story-background-grid" aria-hidden="true" />

      <div className="story-container">
        <Link to="/" className="story-back">
          <ArrowLeft size={17} />
          <span>VOLVER AL INICIO</span>
        </Link>

        <header className="story-hero">
          <div className="story-hero-copy">
            <div className="story-file-tag">
              <span className="story-status-light" />
              ARCHIVO DE METRONIA <span>/</span> HISTORIA
            </div>

            <p className="story-eyebrow">
              EXPEDIENTE HISTÓRICO // VAPORLOCK
            </p>

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
              Explora los registros históricos de Metronia y descubre los
              acontecimientos que forman parte del universo de Vaporlock.
            </p>

            <div className="story-hero-footer">
              <span>REGISTRO HISTÓRICO</span>
              <span>VL // ARCHIVE</span>
            </div>
          </div>

          <div className="story-hero-art" aria-hidden="true">
            <div className="story-art-topline">
              <span>
                <span className="story-status-light" /> SISTEMA ACTIVO
              </span>
              <span>MT // ARCHIVE</span>
            </div>

            <div className="story-art-ruler story-art-ruler-left">
              <span>100</span>
              <span>075</span>
              <span>050</span>
              <span>025</span>
            </div>

            <div className="story-art-orbit story-art-orbit-one" />
            <div className="story-art-orbit story-art-orbit-two" />

            <div className="story-art-cross story-art-cross-one" />
            <div className="story-art-cross story-art-cross-two" />

            <Cog className="story-art-gear story-art-gear-one" />
            <Cog className="story-art-gear story-art-gear-two" />

            <div className="story-art-core">
              <div className="story-art-core-frame">
                <Factory size={82} strokeWidth={1} />
                <div className="story-art-core-scan" />
              </div>
              <span>METRONIA</span>
              <strong>VL</strong>
              <small>ARCHIVO HISTÓRICO</small>
            </div>

            <div className="story-art-side-label">
              <span>REGISTRO</span>
              <strong>MT // 001</strong>
              <span>ARCHIVO</span>
              <strong className="story-art-online">
                {String(historias.length).padStart(2, "0")} ENTRADAS
              </strong>
            </div>

            <div className="story-art-bottom">
              <div>
                <span>01</span>
                <strong>HISTORIA</strong>
              </div>
              <div>
                <span>02</span>
                <strong>REGISTROS</strong>
              </div>
              <div>
                <span>03</span>
                <strong>METRONIA</strong>
              </div>
              <Zap size={22} />
            </div>

            <div className="story-art-caption">
              <span>VAPORLOCK / ARCHIVO VISUAL</span>
              <span>ACCESO RESTRINGIDO</span>
            </div>
          </div>
        </header>

        <section className="story-timeline-section">
          <div className="story-section-heading">
            <div>
              <span className="story-section-kicker">
                ARCHIVOS RECUPERADOS
              </span>
              <h2>EL ORIGEN DEL CONFLICTO</h2>
            </div>

            <span className="story-record-count">
              {String(historias.length).padStart(2, "0")} / REGISTROS
            </span>
          </div>

          {story.status === "loading" && (
            <div className="story-feedback" role="status">
              <RefreshCw size={27} />
              <h3>RECUPERANDO ARCHIVOS.</h3>
              <p>Consultando los registros históricos de Metronia.</p>
            </div>
          )}

          {story.status === "empty" && (
            <div className="story-feedback" role="status">
              <BookOpen size={34} strokeWidth={1.2} />
              <span className="story-section-kicker">
                ARCHIVO // SIN REGISTROS
              </span>
              <h3>NO HAY HISTORIAS DISPONIBLES.</h3>
              <p>
                Los registros históricos aparecerán aquí cuando se publiquen.
              </p>
            </div>
          )}

          {story.status === "error" && (
            <div className="story-feedback story-feedback-error" role="alert">
              <RefreshCw size={27} />

              <div>
                <h3>NO SE PUDIERON CARGAR LAS HISTORIAS.</h3>
                <p>
                  {story.errorMessage ??
                    getHttpErrorMessage(story.statusCode)}
                </p>

                {story.statusCode !== undefined && (
                  <span className="story-http-code">
                    HTTP {story.statusCode}
                  </span>
                )}

                <button
                  type="button"
                  className="story-retry"
                  onClick={() => setRetryKey((current) => current + 1)}
                >
                  REINTENTAR
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
          )}

          {story.status === "invalid-data" && (
            <div className="story-feedback story-feedback-error" role="alert">
              <BookOpen size={27} />

              <div>
                <h3>NO SE PUDO LEER EL ARCHIVO.</h3>
                <p>
                  {story.errorMessage ??
                    "La respuesta recibida no tiene el formato esperado."}
                </p>

                <button
                  type="button"
                  className="story-retry"
                  onClick={() => setRetryKey((current) => current + 1)}
                >
                  REINTENTAR
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
          )}

          {story.status === "success" && (
            <div className="story-timeline">
              {historias.map((historia, index) => {
                const Icon = eventIcons[index % eventIcons.length];
                const eventColor =
                  eventColors[index % eventColors.length];
                const number = String(index + 1).padStart(2, "0");

                const imageUrl =
                  historia.fkMediaPortada !== null
                    ? `${API_URL}/media/${historia.fkMediaPortada}`
                    : null;

                return (
                  <motion.article
                    key={historia.pkHistoria}
                    className="story-event"
                    style={
                      { "--event-color": eventColor } as React.CSSProperties
                    }
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.12, 0.48),
                    }}
                  >
                    <div className="story-event-marker">
                      <span>{number}</span>

                      {index !== historias.length - 1 && (
                        <div className="story-event-connector">
                          <ArrowDown size={15} />
                        </div>
                      )}
                    </div>

                    <div className="story-event-card">
                      {imageUrl && (
                        <img
                          className="story-event-cover"
                          src={imageUrl}
                          alt={`Portada de ${historia.titulo}`}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      )}

                      <div className="story-event-top">
                        <span>REGISTRO // {number}</span>
                        <Icon size={23} strokeWidth={1.6} />
                      </div>

                      <h3>{historia.titulo}</h3>
                      <p>{historia.contenido}</p>

                      <div className="story-event-bottom">
                        <span>
                          ARCHIVO // {String(historia.pkHistoria).padStart(3, "0")}
                        </span>

                        <span className="story-event-status">
                          <span />
                          REGISTRO PUBLICADO
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </section>

        <section className="story-closing">
          <div className="story-closing-pattern" aria-hidden="true" />

          <div className="story-closing-copy">
            <span>EL DESTINO DE METRONIA ESTÁ EN JUEGO</span>
            <h2>CONOCE A LOS IMPLICADOS</h2>
            <p>
              Descubre a Jack Veil, Lucius Corr y los personajes que forman
              parte de este conflicto.
            </p>
          </div>

          <Link to="/personajes" className="story-closing-button">
            VER PERSONAJES <span>→</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
