
import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Image as ImageIcon,
  Monitor,
  Palette,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../css/media.css";

type MediaStatus =
  | "idle"
  | "loading"
  | "success"
  | "empty"
  | "error"
  | "invalid-data";

interface MediaImage {
  id: string;
  url: string;
  title: string;
  description?: string;
}

interface MediaCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: typeof Monitor;
  folder: string;
  images: MediaImage[];
  status: MediaStatus;
  statusCode?: number;
  errorMessage?: string;
}

const initialCategories: MediaCategory[] = [
  {
    id: "escenarios",
    number: "01",
    title: "Escenarios",
    description: "Fondos y escenarios industriales de Metronia.",
    icon: Monitor,
    folder: "ENVIRONMENT",
    images: [],
    status: "empty",
  },
  {
    id: "pixel-art",
    number: "02",
    title: "Pixel Art",
    description: "Sprites de personajes, enemigos y elementos del entorno.",
    icon: Palette,
    folder: "SPRITES & ASSETS",
    images: [],
    status: "empty",
  },
  {
    id: "desarrollo",
    number: "03",
    title: "Desarrollo",
    description: "Capturas y avances del proceso de creación del videojuego.",
    icon: ImageIcon,
    folder: "DEV LOG",
    images: [],
    status: "empty",
  },
];

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
    case "idle":
      return "PENDIENTE";
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
  const [categories] = useState<MediaCategory[]>(initialCategories);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const visibleCategories =
    selectedCategory === "todos"
      ? categories
      : categories.filter((category) => category.id === selectedCategory);

  const scrollCarousel = (categoryId: string, direction: -1 | 1) => {
    const carousel = carouselRefs.current[categoryId];

    if (!carousel) return;

    carousel.scrollBy({
      left: direction * carousel.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  const handleImageError = (imageId: string) => {
    setFailedImages((current) =>
      current.includes(imageId) ? current : [...current, imageId],
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
                    selectedCategory === category.id ? "active" : ""
                  }
                  aria-pressed={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="media-category-grid">
            {visibleCategories.map((category, index) => {
              const validImages = category.images.filter(
                (image) => !failedImages.includes(image.id),
              );

              const allImagesFailed =
                category.images.length > 0 && validImages.length === 0;

              const currentStatus: MediaStatus = allImagesFailed
                ? "invalid-data"
                : category.status;

              const Icon = category.icon;

              return (
                <motion.section
                  key={category.id}
                  className={`media-category-section media-category-${category.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  aria-labelledby={`media-title-${category.id}`}
                >
                  <div className="media-row-heading">
                    <div className="media-row-title">
                      <span className="media-row-number">
                        {category.number}
                      </span>

                      <div>
                        <div className="media-row-kicker">
                          ARCHIVO // {category.folder}
                        </div>

                        <h3 id={`media-title-${category.id}`}>
                          {category.title}
                        </h3>

                        <p>{category.description}</p>
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

                  {currentStatus === "loading" && (
                    <div className="media-state-panel" role="status">
                      <RefreshCw className="media-loading-icon" size={23} />
                      <div>
                        <strong>CARGANDO ARCHIVOS</strong>
                        <p>
                          Consultando el registro visual de esta categoría.
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStatus === "idle" && (
                    <div className="media-state-panel">
                      <Icon size={24} />
                      <div>
                        <strong>ARCHIVO PENDIENTE</strong>
                        <p>
                          El contenido todavía no se ha solicitado.
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStatus === "empty" && (
                    <div className="media-state-panel" role="status">
                      <ImageIcon size={25} strokeWidth={1.3} />
                      <div>
                        <strong>ARCHIVO VACÍO</strong>
                        <p>
                          No hay imágenes disponibles en esta categoría.
                        </p>
                      </div>
                      <span className="media-state-code">NO CONTENT</span>
                    </div>
                  )}

                  {currentStatus === "error" && (
                    <div className="media-state-panel media-state-error" role="alert">
                      <RefreshCw size={24} />
                      <div>
                        <strong>NO SE PUDO CARGAR EL CONTENIDO</strong>
                        <p>
                          {category.errorMessage ??
                            getErrorMessage(category.statusCode)}
                        </p>
                        {category.statusCode !== undefined && (
                          <span className="media-http-code">
                            HTTP {category.statusCode}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {currentStatus === "invalid-data" && (
                    <div className="media-state-panel media-state-error" role="alert">
                      <ImageIcon size={24} />
                      <div>
                        <strong>NO SE PUDO LEER EL CONTENIDO</strong>
                        <p>
                          {allImagesFailed
                            ? "Las imágenes de esta categoría no se pudieron cargar o no son válidas."
                            : category.errorMessage ??
                              "La respuesta recibida no contiene datos válidos."}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStatus === "success" &&
                    validImages.length === 0 && (
                      <div className="media-state-panel media-state-error" role="alert">
                        <ImageIcon size={24} />
                        <div>
                          <strong>CONTENIDO NO DISPONIBLE</strong>
                          <p>
                            La categoría indicó que tenía contenido, pero no
                            se encontraron imágenes válidas.
                          </p>
                        </div>
                      </div>
                    )}

                  {validImages.length > 0 &&
                    currentStatus !== "loading" &&
                    currentStatus !== "error" &&
                    currentStatus !== "invalid-data" && (
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
                                  onError={() =>
                                    handleImageError(image.id)
                                  }
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
                                {image.description && (
                                  <p>{image.description}</p>
                                )}
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
