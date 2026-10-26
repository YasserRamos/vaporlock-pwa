
import { ArrowLeft, Newspaper } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import "../css/news.css";

export default function NewsDetailPage() {
  const { slug } = useParams();

  return (
    <main className="news-page">
      <div className="news-grid-bg" aria-hidden="true" />

      <div className="news-container">
        <Link to="/news" className="news-back">
          <ArrowLeft size={17} />
          VOLVER A NOTICIAS
        </Link>

        <section className="news-empty">
          <div className="news-empty-icon">
            <Newspaper size={34} strokeWidth={1.2} />
          </div>

          <span className="news-empty-code">
            ARCHIVO // {slug ?? "NOTICIA"}
          </span>

          <h3>DETALLE DE LA NOTICIA</h3>

          <p>
            Esta página está preparada para mostrar el contenido completo
            de la publicación cuando conectemos la API.
          </p>
        </section>
      </div>
    </main>
  );
}
