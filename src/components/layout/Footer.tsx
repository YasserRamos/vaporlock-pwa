
import { Link } from "react-router-dom";
import { ArrowUp, Cog, ChevronRight } from "lucide-react";
import "./css/footer.css";

const footerLinks = [
  { label: "Inicio", to: "/" },
  { label: "Historia", to: "/historia" },
  { label: "Personajes", to: "/personajes" },
  { label: "Niveles", to: "/niveles" },
  { label: "Galería", to: "/galeria" },
  { label: "Equipo", to: "/equipo" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="vapor-footer">
      <div className="vapor-footer-topline" aria-hidden="true" />

      <div className="vapor-footer-main">
        <div className="vapor-footer-brand">
          <Link to="/" className="vapor-footer-logo">
            <Cog size={30} strokeWidth={1.7} />
            <span>
              VAPOR<span className="vapor-footer-logo-accent">LOCK</span>
            </span>
          </Link>

          <div className="vapor-footer-location">
            <span className="vapor-footer-status" />
            METRONIA <span>//</span> 2943
          </div>

          <p className="vapor-footer-description">
            Una aventura de acción y plataformas en 2D ambientada en Metronia,
            una ciudad steampunk futurista del año 2943.
          </p>

          <div className="vapor-footer-academic">
            <span>PROYECTO ACADÉMICO</span>
            <p>Universidad Tecnológica de Cancún</p>
            <p>Integradora III</p>
          </div>
        </div>

        <div className="vapor-footer-navigation">
          <p className="vapor-footer-section-label">
            <ChevronRight size={15} />
            ÍNDICE DE ARCHIVOS
          </p>

          <h2>Explorar Vaporlock</h2>

          <nav aria-label="Enlaces del pie de página">
            {footerLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                className="vapor-footer-link"
              >
                <span className="vapor-footer-link-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{link.label}</span>
                <ChevronRight
                  size={15}
                  className="vapor-footer-link-arrow"
                />
              </Link>
            ))}
          </nav>
        </div>

        <div className="vapor-footer-decoration" aria-hidden="true">
          <div className="vapor-footer-gear">
            <Cog size={72} strokeWidth={0.8} />
          </div>
          <span className="vapor-footer-decoration-line" />
          <span className="vapor-footer-decoration-caption">
            METRONIA INDUSTRIAL ARCHIVE
          </span>
          <div className="vapor-footer-pixels">
            {Array.from({ length: 9 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="vapor-footer-bottom">
        <p>
          <span className="vapor-footer-status" />
          VAPORLOCK <span className="vapor-footer-separator">/</span>{" "}
          PROYECTO ACADÉMICO
        </p>

        <span className="vapor-footer-copyright">
          METRONIA · 2943
        </span>

        <button
          type="button"
          onClick={scrollToTop}
          className="vapor-footer-top-button"
        >
          VOLVER ARRIBA
          <ArrowUp size={15} />
        </button>
      </div>
    </footer>
  );
}
