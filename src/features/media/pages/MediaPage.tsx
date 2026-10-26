
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Image as ImageIcon,
  Monitor,
  Palette,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../css/media.css";

const categories = [
  {
    id: "escenarios",
    number: "01",
    title: "Escenarios",
    description: "Fondos y escenarios industriales de Metronia.",
    icon: Monitor,
    folder: "ENVIRONMENT",
  },
  {
    id: "pixel-art",
    number: "02",
    title: "Pixel Art",
    description: "Sprites de personajes, enemigos y elementos del entorno.",
    icon: Palette,
    folder: "SPRITES & ASSETS",
  },
  {
    id: "desarrollo",
    number: "03",
    title: "Desarrollo",
    description: "Capturas y avances del proceso de creación del videojuego.",
    icon: ImageIcon,
    folder: "DEV LOG",
  },
];

export default function MediaPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const visibleCategories =
    selectedCategory === "todos"
      ? categories
      : categories.filter((category) => category.id === selectedCategory);

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

            <p className="media-eyebrow">REGISTRO DE MATERIAL GRÁFICO</p>

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
              <span className="media-section-kicker">ÍNDICE DE CONTENIDO</span>
              <h2>EXPLORAR ARCHIVOS</h2>
            </div>

            <div className="media-filters" aria-label="Filtrar galería">
              <button
                type="button"
                className={selectedCategory === "todos" ? "active" : ""}
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
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="media-category-grid">
            {visibleCategories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.article
                  key={category.id}
                  className={`media-category-card media-category-${category.id}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                >
                  <div className="media-card-visual" aria-hidden="true">
                    <div className="media-visual-grid" />
                    <div className="media-visual-scanline" />

                    <span className="media-visual-number">
                      {category.number}
                    </span>

                    <div className="media-visual-symbol">
                      <Icon size={60} strokeWidth={1} />
                    </div>

                    <span className="media-visual-code">
                      {category.folder}
                    </span>

                    <span className="media-visual-cross media-cross-one">
                      +
                    </span>
                    <span className="media-visual-cross media-cross-two">
                      +
                    </span>
                  </div>

                  <div className="media-card-content">
                    <div className="media-card-meta">
                      <span>ARCHIVO // {category.number}</span>
                      <span>VAPORLOCK</span>
                    </div>

                    <h3>{category.title}</h3>
                    <p>{category.description}</p>

                    <div className="media-card-bottom">
                      <span>COLECCIÓN VISUAL</span>
                      <ArrowUpRight size={19} />
                    </div>
                  </div>
                </motion.article>
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

          <span className="media-footer-mark">VL<span>_</span></span>
        </footer>
      </div>
    </main>
  );
}
