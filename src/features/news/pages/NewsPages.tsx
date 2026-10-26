
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Newspaper,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../css/news.css";

type NewsStatus =
  | "loading"
  | "success"
  | "empty"
  | "error"
  | "invalid-data";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  imageUrl: string | null;
  category: string;
  publishedAt: string;
  slug: string;
}

interface NewsPageData {
  articles: NewsArticle[];
  status: NewsStatus;
  statusCode?: number;
  errorMessage?: string;
}

const initialNews: NewsPageData = {
  articles: [],
  status: "empty",
};

function getHttpErrorMessage(statusCode?: number): string {
  if (statusCode === undefined) {
    return "No fue posible conectar con el servidor. Comprueba tu conexión.";
  }

  switch (statusCode) {
    case 400:
      return "La solicitud no es válida.";
    case 401:
      return "Necesitas iniciar sesión para consultar este contenido.";
    case 403:
      return "No tienes permisos para consultar estas noticias.";
    case 404:
      return "No se encontró el recurso de noticias solicitado.";
    case 409:
      return "Se produjo un conflicto al consultar las noticias.";
    case 422:
      return "Los datos enviados no pudieron ser procesados.";
    case 429:
      return "Se han realizado demasiadas solicitudes. Inténtalo más tarde.";
    case 500:
      return "El servidor encontró un error interno.";
    case 502:
    case 503:
    case 504:
      return "El servicio no está disponible temporalmente.";
    default:
      if (statusCode >= 500) {
        return "Ocurrió un error en el servidor.";
      }

      if (statusCode >= 400) {
        return "No se pudieron recuperar las noticias.";
      }

      return "Ocurrió un error inesperado.";
  }
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

function NewsSkeleton() {
  return (
    <div className="news-skeleton-list" aria-label="Cargando noticias">
      {[0, 1, 2].map((item) => (
        <div className="news-skeleton" key={item}>
          <div className="news-skeleton-image" />
          <div className="news-skeleton-content">
            <div className="news-skeleton-line news-skeleton-short" />
            <div className="news-skeleton-line news-skeleton-title" />
            <div className="news-skeleton-line" />
            <div className="news-skeleton-line news-skeleton-medium" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function NewsPage() {
  // Se sustituirá por la respuesta del servicio cuando conectemos la API.
  const [news] = useState<NewsPageData>(initialNews);

  const articles = [...news.articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime(),
  );

  return (
    <main className="news-page">
      <div className="news-grid-bg" aria-hidden="true" />

      <div className="news-container">
        <Link to="/" className="news-back">
          <ArrowLeft size={17} />
          VOLVER AL INICIO
        </Link>

        <header className="news-header">
          <div className="news-header-copy">
            <div className="news-file-label">
              <span />
              CENTRO DE INFORMACIÓN <b>//</b> VAPORLOCK
            </div>

            <p className="news-eyebrow">
              COMUNICADOS Y ACTUALIZACIONES
            </p>

            <h1>
              ÚLTIMAS
              <span>NOTICIAS.</span>
            </h1>

            <p className="news-intro">
              Anuncios, avances y novedades sobre el desarrollo de
              Vaporlock. Consulta las últimas publicaciones y explora
              el archivo de noticias de Metronia.
            </p>
          </div>

          <div className="news-header-stamp" aria-hidden="true">
            <Newspaper size={47} strokeWidth={1} />
            <span>NEWS ARCHIVE</span>
            <strong>VL-2943</strong>
          </div>
        </header>

        <section className="news-content">
          <div className="news-section-heading">
            <div>
              <span className="news-section-kicker">
                REGISTRO DE PUBLICACIONES
              </span>
              <h2>NOTICIAS Y ACTUALIZACIONES</h2>
            </div>

            <span className="news-total">
              {String(articles.length).padStart(2, "0")} PUBLICACIONES
            </span>
          </div>

          {news.status === "loading" && (
            <NewsSkeleton />
          )}

          {news.status === "empty" && (
            <div className="news-empty" role="status">
              <div className="news-empty-icon">
                <Newspaper size={34} strokeWidth={1.2} />
              </div>

              <span className="news-empty-code">
                ARCHIVO // SIN REGISTROS
              </span>

              <h3>TODAVÍA NO HAY NOTICIAS.</h3>

              <p>
                Las novedades de Vaporlock aparecerán aquí cuando se
                publiquen. Vuelve más adelante para consultar las
                actualizaciones del proyecto.
              </p>
            </div>
          )}

          {news.status === "error" && (
            <div className="news-feedback news-feedback-error" role="alert">
              <RefreshCw size={27} />

              <div>
                <h3>NO SE PUDIERON CARGAR LAS NOTICIAS.</h3>
                <p>
                  {news.errorMessage ??
                    getHttpErrorMessage(news.statusCode)}
                </p>

                {news.statusCode !== undefined && (
                  <span className="news-http-code">
                    HTTP {news.statusCode}
                  </span>
                )}
              </div>
            </div>
          )}

          {news.status === "invalid-data" && (
            <div className="news-feedback news-feedback-error" role="alert">
              <Newspaper size={27} />

              <div>
                <h3>NO SE PUDO LEER EL CONTENIDO.</h3>
                <p>
                  {news.errorMessage ??
                    "La respuesta recibida no tiene el formato esperado."}
                </p>
              </div>
            </div>
          )}

          {news.status === "success" && articles.length === 0 && (
            <div className="news-empty" role="status">
              <Newspaper size={34} strokeWidth={1.2} />
              <h3>NO HAY PUBLICACIONES DISPONIBLES.</h3>
              <p>
                La consulta se completó, pero no se encontraron noticias.
              </p>
            </div>
          )}

          {news.status === "success" && articles.length > 0 && (
            <div className="news-timeline">
              {articles.map((article, index) => (
                <motion.article
                  className="news-article"
                  key={article.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(index * 0.06, 0.3),
                  }}
                >
                  <div className="news-article-date">
                    <span className="news-timeline-dot" />
                    <CalendarDays size={15} />
                    <time dateTime={article.publishedAt}>
                      {formatNewsDate(article.publishedAt)}
                    </time>
                  </div>

                  <div className="news-article-card">
                    <div className="news-article-image">
                      {article.imageUrl ? (
                        <img
                          src={article.imageUrl}
                          alt=""
                          loading="lazy"
                        />
                      ) : (
                        <div className="news-image-placeholder">
                          <Newspaper
                            size={38}
                            strokeWidth={1}
                          />
                          <span>IMAGEN NO DISPONIBLE</span>
                        </div>
                      )}

                      <span className="news-image-code">
                        VL // {String(index + 1).padStart(3, "0")}
                      </span>
                    </div>

                    <div className="news-article-body">
                      <div className="news-article-meta">
                        <span className="news-category-tag">
                          {article.category}
                        </span>
                        <span>VAPORLOCK // NEWS</span>
                      </div>

                      <h3>{article.title}</h3>

                      <p className="news-article-summary">
                        {article.summary}
                      </p>

                      <Link
                        className="news-read-more"
                        to={`/news/${encodeURIComponent(article.slug)}`}
                      >
                        LEER NOTICIA
                        <ArrowUpRight size={17} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        <footer className="news-footer">
          <div>
            <span className="news-footer-kicker">
              VAPORLOCK // 2943
            </span>
            <h2>EL FUTURO DE METRONIA SIGUE EN DESARROLLO.</h2>
            <p>
              Consulta este archivo para conocer las novedades del videojuego.
            </p>
          </div>

          <span className="news-footer-mark">
            VL<span>_</span>
          </span>
        </footer>
      </div>
    </main>
  );
}
