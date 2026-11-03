
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ImageIcon,
  Newspaper,
  RefreshCw,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import "../css/news.css";

type NewsDetailStatus =
  | "loading"
  | "success"
  | "not-found"
  | "error"
  | "invalid-data";

interface NoticiaApi {
  pkNoticia: number;
  fkMediaPortada: number | null;
  titulo: string;
  slug: string;
  resumen: string | null;
  contenido: string;
  fechaCreacion: string;
  fechaPublicacion: string | null;
}

interface NewsDetailState {
  noticia: NoticiaApi | null;
  status: NewsDetailStatus;
  statusCode?: number;
  errorMessage?: string;
}

const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

function isValidNews(data: unknown): data is NoticiaApi {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const noticia = data as Record<string, unknown>;

  return (
    typeof noticia.pkNoticia === "number" &&
    (noticia.fkMediaPortada === null ||
      typeof noticia.fkMediaPortada === "number") &&
    typeof noticia.titulo === "string" &&
    typeof noticia.slug === "string" &&
    (noticia.resumen === null ||
      typeof noticia.resumen === "string") &&
    typeof noticia.contenido === "string" &&
    typeof noticia.fechaCreacion === "string" &&
    (noticia.fechaPublicacion === null ||
      typeof noticia.fechaPublicacion === "string")
  );
}

function formatNewsDate(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "FECHA NO DISPONIBLE";
  }

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function getHttpErrorMessage(statusCode?: number): string {
  if (statusCode === undefined) {
    return "No fue posible conectar con el servidor. Comprueba tu conexión.";
  }

  switch (statusCode) {
    case 400:
      return "La solicitud no es válida.";
    case 401:
      return "Necesitas iniciar sesión para consultar esta noticia.";
    case 403:
      return "No tienes permisos para consultar esta noticia.";
    case 404:
      return "La noticia que buscas no existe o ya no está disponible.";
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
        : "No se pudo recuperar la noticia.";
  }
}

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [news, setNews] = useState<NewsDetailState>({
    noticia: null,
    status: "loading",
  });

  const [retryKey, setRetryKey] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchNewsDetail() {
      setNews({
        noticia: null,
        status: "loading",
      });

      setImageError(false);

      if (!slug) {
        setNews({
          noticia: null,
          status: "not-found",
        });
        return;
      }

      if (!API_URL) {
        setNews({
          noticia: null,
          status: "error",
          errorMessage:
            "No se encontró la variable VITE_API_URL en la configuración.",
        });
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/noticias/${encodeURIComponent(slug)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
          },
        );

        if (response.status === 404) {
          setNews({
            noticia: null,
            status: "not-found",
            statusCode: 404,
          });
          return;
        }

        if (!response.ok) {
          setNews({
            noticia: null,
            status: "error",
            statusCode: response.status,
          });
          return;
        }

        const data: unknown = await response.json();

        if (!isValidNews(data)) {
          setNews({
            noticia: null,
            status: "invalid-data",
            errorMessage:
              "La respuesta de la API no coincide con la estructura esperada de NoticiaDto.",
          });
          return;
        }

        setNews({
          noticia: data,
          status: "success",
        });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setNews({
          noticia: null,
          status: "error",
          errorMessage:
            error instanceof Error
              ? error.message
              : getHttpErrorMessage(),
        });
      }
    }

    void fetchNewsDetail();

    return () => {
      controller.abort();
    };
  }, [slug, retryKey]);

  const noticia = news.noticia;

  const imageUrl =
    noticia?.fkMediaPortada !== null &&
    noticia?.fkMediaPortada !== undefined
      ? `${API_URL}/media/${noticia.fkMediaPortada}`
      : null;

  const publishedAt = noticia
    ? noticia.fechaPublicacion ?? noticia.fechaCreacion
    : null;

  return (
    <main className="news-page">
      <div className="news-grid-bg" aria-hidden="true" />

      <div className="news-container">
        <Link to="/news" className="news-back">
          <ArrowLeft size={17} />
          VOLVER A NOTICIAS
        </Link>

        {news.status === "loading" && (
          <section className="news-empty" role="status">
            <RefreshCw size={30} />
            <span className="news-empty-code">
              ARCHIVO // CONSULTANDO
            </span>
            <h3>CARGANDO NOTICIA.</h3>
            <p>Recuperando la publicación desde los archivos de Metronia.</p>
          </section>
        )}

        {news.status === "not-found" && (
          <section className="news-empty" role="status">
            <div className="news-empty-icon">
              <Newspaper size={34} strokeWidth={1.2} />
            </div>

            <span className="news-empty-code">
              ARCHIVO // 404
            </span>

            <h3>NOTICIA NO ENCONTRADA.</h3>

            <p>
              La publicación solicitada no existe o ya no está disponible.
            </p>

            <Link to="/news" className="news-read-more">
              VOLVER AL ARCHIVO
              <ArrowLeft size={17} />
            </Link>
          </section>
        )}

        {(news.status === "error" ||
          news.status === "invalid-data") && (
          <section
            className="news-feedback news-feedback-error"
            role="alert"
          >
            <Newspaper size={27} />

            <div>
              <h3>
                {news.status === "error"
                  ? "NO SE PUDO CARGAR LA NOTICIA."
                  : "NO SE PUDO LEER EL CONTENIDO."}
              </h3>

              <p>
                {news.errorMessage ??
                  (news.statusCode !== undefined
                    ? getHttpErrorMessage(news.statusCode)
                    : "La respuesta recibida no tiene el formato esperado.")}
              </p>

              {news.statusCode !== undefined && (
                <span className="news-http-code">
                  HTTP {news.statusCode}
                </span>
              )}

              <button
                type="button"
                className="news-read-more"
                onClick={() => setRetryKey((current) => current + 1)}
              >
                REINTENTAR
                <RefreshCw size={16} />
              </button>
            </div>
          </section>
        )}

        {news.status === "success" && noticia && (
          <article className="news-detail">
            <header className="news-detail-header">
              <div className="news-file-label">
                <span />
                CENTRO DE INFORMACIÓN <b>//</b> VAPORLOCK
              </div>

              <span className="news-section-kicker">
                ARCHIVO DE PUBLICACIONES
              </span>

              <h1 className="news-detail-title">
                {noticia.titulo}
              </h1>

              <div className="news-detail-meta">
                {publishedAt && (
                  <span>
                    <CalendarDays size={16} />
                    <time dateTime={publishedAt}>
                      {formatNewsDate(publishedAt)}
                    </time>
                  </span>
                )}

                <span>VAPORLOCK // NEWS</span>
              </div>
            </header>

            {imageUrl && !imageError ? (
              <div className="news-detail-image">
                <img
                  src={imageUrl}
                  alt={`Portada de ${noticia.titulo}`}
                  onError={() => setImageError(true)}
                />

                <span className="news-image-code">
                  VL // {String(noticia.pkNoticia).padStart(3, "0")}
                </span>
              </div>
            ) : (
              <div className="news-detail-image news-image-placeholder">
                <ImageIcon size={42} strokeWidth={1} />
                <span>IMAGEN NO DISPONIBLE</span>
              </div>
            )}

            {noticia.resumen && (
              <p className="news-detail-summary">
                {noticia.resumen}
              </p>
            )}

            <div className="news-detail-content">
              {noticia.contenido}
            </div>

            <footer className="news-detail-footer">
              <span className="news-footer-kicker">
                VAPORLOCK // 2943
              </span>

              <Link to="/news" className="news-read-more">
                <ArrowLeft size={17} />
                VOLVER A NOTICIAS
              </Link>
            </footer>
          </article>
        )}
      </div>
    </main>
  );
}
