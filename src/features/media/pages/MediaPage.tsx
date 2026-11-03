import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Image as ImageIcon,
  Monitor,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../css/media.css";

interface MediaApi {
  pkMedia: number;
  fkCategoriaMedia: number;
  categoria: string;
  nombreArchivo: string;
  contentType: string;
  textoAlternativo: string | null;
  fechaCreacion: string;
}

interface MediaImage {
  id: number;
  url: string;
  title: string;
  contentType: string;
}

interface MediaCategory {
  id: number;
  title: string;
  images: MediaImage[];
}

type MediaStatus =
  | "loading"
  | "success"
  | "empty"
  | "error"
  | "invalid-data";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

function getErrorMessage(statusCode?: number): string {
  if (statusCode === undefined) {
    return "No fue posible conectar con el servidor. Comprueba tu conexión.";
  }

  switch (statusCode) {
    case 400:
      return "La solicitud es incorrecta. No se pudo obtener la galería.";
    case 401:
      return "Es necesario iniciar sesión para acceder a este contenido.";
    case 403:
      return "No tienes permisos para consultar este contenido.";
    case 404:
      return "No se encontró el recurso solicitado.";
    case 409:
      return "El contenido presenta un conflicto y no se pudo recuperar.";
    case 422:
      return "La solicitud contiene datos que el servidor no puede procesar.";
    case 429:
      return "Se han realizado demasiadas solicitudes. Inténtalo más tarde.";
    case 500:
      return "El servidor encontró un error interno.";
    case 502:
    case 503:
    case 504:
      return "El servicio no está disponible temporalmente. Inténtalo más tarde.";
    default:
      if (statusCode >= 500) {
        return "Ocurrió un error en el servidor. Inténtalo más tarde.";
      }

      if (statusCode >= 400) {
        return "No se pudo completar la solicitud.";
      }

      return "Ocurrió un error inesperado al cargar el contenido.";
  }
}

function getStatusLabel(status: MediaStatus): string {
  switch (status) {
    case "loading":
      return "CARGANDO";
    case "success":
      return "DISPONIBLE";
    case "empty":
      return "SIN CONTENIDO";
    case "invalid-data":
      return "DATOS INVÁLIDOS";
    case "error":
      return "ERROR DE CARGA";
  }
}

export default function MediaPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [media, setMedia] = useState<MediaApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | undefined>();
  const [failedImages, setFailedImages] = useState<number[]>([]);

  const carouselRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const controller = new AbortController();

    const fetchMedia = async () => {
      if (!API_URL) {
        setError("No se ha configurado la URL de la API.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setStatusCode(undefined);

        const response = await fetch(`${API_URL}/media`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          setStatusCode(response.status);
          throw new Error(getErrorMessage(response.status));
        }

        const data: MediaApi[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "La respuesta de la API no tiene un formato válido."
          );
        }

        setMedia(data);
        setFailedImages([]);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "No se pudo cargar el contenido multimedia."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMedia();

    return () => controller.abort();
  }, []);

  const categories = useMemo<MediaCategory[]>(() => {
    const grouped = new Map<number, MediaCategory>();

    media
      .filter((item) => item.contentType?.startsWith("image/"))
      .forEach((item) => {
        let category = grouped.get(item.fkCategoriaMedia);

        if (!category) {
          category = {
            id: item.fkCategoriaMedia,
            title: item.categoria,
            images: [],
          };

          grouped.set(item.fkCategoriaMedia, category);
        }

        category.images.push({
          id: item.pkMedia,
          url: `${API_URL}/media/${item.pkMedia}`,
          title: item.textoAlternativo || item.nombreArchivo,
          contentType: item.contentType,
        });
      });

    return Array.from(grouped.values());
  }, [media]);

  const visibleCategories =
    selectedCategory === "todos"
      ? categories
      : categories.filter(
          (category) => String(category.id) === selectedCategory
        );

  const scrollCarousel = (categoryId: number, direction: -1 | 1) => {
    const carousel = carouselRefs.current[categoryId];

    if (!carousel) return;

    carousel.scrollBy({
      left: direction * carousel.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  const handleImageError = (imageId: number) => {
    setFailedImages((current) =>
      current.includes(imageId) ? current : [...current, imageId]
    );
  };

  return (
    <main className="media-page">
      <div className="media-grid-bg" aria-hidden="true" />

      <div className="media-container">
        <Link to="/" className="media-back">
          <ArrowLeft size={17} />
          VOLVER AL INICIO
        </Link>

        <header className="media-header">
          <div className="media-heading-copy">
            <div className="media-file-label">
              <span />
              ARCHIVO VISUAL <b>//</b> VAPORLOCK
            </div>

            <p className="media-eyebrow">
              REGISTRO DE MATERIAL GRÁFICO
            </p>

            <h1>
              GALERÍA
              <span>VISUAL.</span>
            </h1>

            <p className="media-intro">
              Un registro del universo visual de Vaporlock: escenarios,
              sprites y material del desarrollo del videojuego.
            </p>
          </div>

          <div className="media-header-stamp" aria-hidden="true">
            <div className="media-stamp-inner">
              <ImageIcon size={48} strokeWidth={1} />
              <span>VISUAL DATABASE</span>
              <strong>VL-2943</strong>
            </div>

            <span className="media-stamp-corner media-stamp-corner-tl" />
            <span className="media-stamp-corner media-stamp-corner-br" />
          </div>
        </header>

        <section className="media-gallery">
          <div className="media-toolbar">
            <div>
              <span className="media-section-kicker">
                ÍNDICE DE CONTENIDO
              </span>
              <h2>EXPLORAR ARCHIVOS</h2>
            </div>

            <div className="media-filters" aria-label="Filtrar galería">
              <button
                type="button"
                className={selectedCategory === "todos" ? "active" : ""}
                aria-pressed={selectedCategory === "todos"}
                onClick={() => setSelectedCategory("todos")}
              >
                TODO
              </button>

              {categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  className={
                    selectedCategory === String(category.id) ? "active" : ""
                  }
                  aria-pressed={selectedCategory === String(category.id)}
                  onClick={() =>
                    setSelectedCategory(String(category.id))
                  }
                >
                  {category.title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="media-state-panel" role="status">
              <RefreshCw className="media-loading-icon" size={23} />
              <div>
                <strong>CARGANDO ARCHIVOS</strong>
                <p>Consultando el registro visual de Vaporlock.</p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div
              className="media-state-panel media-state-error"
              role="alert"
            >
              <RefreshCw size={24} />
              <div>
                <strong>NO SE PUDO CARGAR EL CONTENIDO</strong>
                <p>{error}</p>
                {statusCode !== undefined && (
                  <span className="media-http-code">
                    HTTP {statusCode}
                  </span>
                )}
              </div>
            </div>
          )}

          {!loading && !error && media.length === 0 && (
            <div className="media-state-panel" role="status">
              <ImageIcon size={25} strokeWidth={1.3} />
              <div>
                <strong>ARCHIVO VACÍO</strong>
                <p>No hay archivos multimedia registrados.</p>
              </div>
              <span className="media-state-code">NO CONTENT</span>
            </div>
          )}

          {!loading && !error && media.length > 0 && categories.length === 0 && (
            <div className="media-state-panel" role="status">
              <ImageIcon size={25} strokeWidth={1.3} />
              <div>
                <strong>SIN IMÁGENES DISPONIBLES</strong>
                <p>
                  Los archivos registrados no contienen imágenes compatibles
                  con la galería.
                </p>
              </div>
            </div>
          )}

          {!loading && !error && categories.length > 0 && (
            <div className="media-category-grid">
              {visibleCategories.map((category, index) => {
                const validImages = category.images.filter(
                  (image) => !failedImages.includes(image.id)
                );

                const allImagesFailed =
                  category.images.length > 0 && validImages.length === 0;

                const currentStatus: MediaStatus = allImagesFailed
                  ? "invalid-data"
                  : validImages.length > 0
                    ? "success"
                    : "empty";

                return (
                  <motion.section
                    key={category.id}
                    className="media-category-section"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    aria-labelledby={`media-title-${category.id}`}
                  >
                    <div className="media-row-heading">
                      <div className="media-row-title">
                        <span className="media-row-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div>
                          <div className="media-row-kicker">
                            ARCHIVO // {category.id}
                          </div>

                          <h3 id={`media-title-${category.id}`}>
                            {category.title}
                          </h3>
                        </div>
                      </div>

                      <div className="media-row-controls">
                        <span className="media-image-count">
                          {validImages.length.toString().padStart(2, "0")}{" "}
                          ARCHIVOS
                        </span>

                        {validImages.length > 0 && (
                          <>
                            <button
                              type="button"
                              className="media-carousel-arrow"
                              aria-label={`Desplazar ${category.title} a la izquierda`}
                              onClick={() =>
                                scrollCarousel(category.id, -1)
                              }
                            >
                              <ArrowLeft size={19} />
                            </button>

                            <button
                              type="button"
                              className="media-carousel-arrow"
                              aria-label={`Desplazar ${category.title} a la derecha`}
                              onClick={() =>
                                scrollCarousel(category.id, 1)
                              }
                            >
                              <ArrowRight size={19} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {currentStatus === "empty" && (
                      <div className="media-state-panel" role="status">
                        <Monitor size={24} />
                        <div>
                          <strong>ARCHIVO VACÍO</strong>
                          <p>No hay imágenes disponibles en esta categoría.</p>
                        </div>
                      </div>
                    )}

                    {currentStatus === "invalid-data" && (
                      <div
                        className="media-state-panel media-state-error"
                        role="alert"
                      >
                        <ImageIcon size={24} />
                        <div>
                          <strong>NO SE PUDO LEER EL CONTENIDO</strong>
                          <p>
                            Las imágenes de esta categoría no se pudieron
                            cargar o no son válidas.
                          </p>
                        </div>
                      </div>
                    )}

                    {validImages.length > 0 && (
                      <div className="media-carousel-shell">
                        <div
                          className="media-carousel-track"
                          ref={(element) => {
                            carouselRefs.current[category.id] = element;
                          }}
                          aria-label={`Imágenes de ${category.title}`}
                        >
                          {validImages.map((image, imageIndex) => (
                            <article
                              className="media-thumbnail"
                              key={image.id}
                            >
                              <div className="media-thumbnail-image">
                                <img
                                  src={image.url}
                                  alt={image.title}
                                  loading="lazy"
                                  onError={() => handleImageError(image.id)}
                                />

                                <span className="media-thumbnail-index">
                                  {String(imageIndex + 1).padStart(2, "0")}
                                </span>

                                <span
                                  className="media-thumbnail-open"
                                  aria-hidden="true"
                                >
                                  <ArrowUpRight size={20} />
                                </span>
                              </div>

                              <div className="media-thumbnail-caption">
                                <h4>{image.title}</h4>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="media-row-footer">
                      <span>VAPORLOCK // VISUAL DATABASE</span>
                      <span>{getStatusLabel(currentStatus)}</span>
                    </div>
                  </motion.section>
                );
              })}
            </div>
          )}
        </section>

        <footer className="media-footer">
          <div>
            <span className="media-footer-kicker">VAPORLOCK // 2943</span>
            <h2>CADA DETALLE CONSTRUYE METRONIA.</h2>
            <p>
              Material visual y avances del desarrollo reunidos en un solo
              archivo.
            </p>
          </div>

          <span className="media-footer-mark">
            VL<span>_</span>
          </span>
        </footer>
      </div>
    </main>
  );
}