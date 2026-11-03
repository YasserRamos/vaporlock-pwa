
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Map, ImageOff } from "lucide-react";
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

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

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
          throw new Error(
            `Error al obtener los niveles. Código: ${response.status}`,
          );
        }

        const data: Nivel[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("La respuesta de la API no tiene un formato válido.");
        }

        setLevels(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "No se pudieron cargar los niveles.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchLevels();

    return () => controller.abort();
  }, []);

  const getCoverUrl = (mediaId: number | null): string | null => {
    if (!mediaId || !API_URL) {
      return null;
    }

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

            <h1>
              LOS <span>NIVELES</span>
            </h1>

            <p>
              Explora los niveles registrados en el archivo de operaciones
              de Vaporlock.
            </p>
          </div>

          <div className="levels-counter">
            <span>OPERACIONES REGISTRADAS</span>
            <strong>
              {loading ? "--" : String(levels.length).padStart(2, "0")}
            </strong>
            <div className="levels-counter-bars">
              {levels.map((level) => (
                <i key={level.pkNivel} />
              ))}
            </div>
          </div>
        </motion.header>

        <section className="levels-section">
          <div className="levels-section-heading">
            <div>
              <span className="levels-section-label">
                ARCHIVO DE OPERACIONES
              </span>
              <h2>Selección de nivel</h2>
            </div>

            <span className="levels-total">
              {loading
                ? "CARGANDO..."
                : `${String(levels.length).padStart(2, "0")} REGISTROS`}
            </span>
          </div>

          {loading && (
            <div className="levels-feedback">
              Cargando niveles...
            </div>
          )}

          {!loading && error && (
            <div className="levels-feedback levels-feedback--error">
              {error}
            </div>
          )}

          {!loading && !error && levels.length === 0 && (
            <div className="levels-feedback">
              No hay niveles publicados disponibles.
            </div>
          )}

          {!loading && !error && levels.length > 0 && (
            <div className="levels-grid">
              {levels.map((level, index) => {
                const coverUrl = getCoverUrl(level.fkMediaPortada);

                return (
                  <motion.article
                    className="level-card"
                    key={level.pkNivel}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.12,
                    }}
                  >
                    <div className="level-card-top">
                      <span className="level-number">
                        {String(level.orden).padStart(2, "0")}
                      </span>

                      <span className="level-status">
                        ORDEN {String(level.orden).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="level-card-icon">
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={`Portada de ${level.nombre}`}
                          className="level-card-cover"
                          loading="lazy"
                        />
                      ) : (
                        <ImageOff size={25} strokeWidth={1.5} />
                      )}
                    </div>

                    <h3>{level.nombre}</h3>

                    <p className="level-description">
                      {level.descripcion || "Sin descripción disponible."}
                    </p>

                    <div className="level-divider" />

                    <div className="level-card-footer">
                      <Map size={14} />
                      <span>REGISTRO PUBLICADO</span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </section>

        <footer className="levels-footer">
          <span className="levels-footer-indicator" />
          <p>
            VAPORLOCK <span>/</span> ARCHIVO DE NIVELES
          </p>
          <span className="levels-footer-version">METRONIA · 2943</span>
        </footer>
      </div>
    </main>
  );
}
