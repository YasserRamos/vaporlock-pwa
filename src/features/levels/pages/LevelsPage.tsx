import { motion } from "motion/react";
import { ArrowLeft, Map, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/levels.css";

const levels = [
  {
    number: "01",
    title: "Nivel 1",
    status: "01 / INICIAL",
    description:
      "Incluye al Doctor y el tutorial según los datos actuales del proyecto.",
    characters: ["Doctor"],
    color: "#39d5cb",
  },
  {
    number: "02",
    title: "Nivel 2",
    status: "02 / INTERMEDIO",
    description:
      "Incluye a la Tecnócrata, enemigos y el sub-jefe Victoria Ashford.",
    characters: ["Tecnócrata", "Victoria Ashford"],
    color: "#e99545",
  },
  {
    number: "03",
    title: "Nivel 3",
    status: "03 / FINAL",
    description:
      "Incluye a Lucius Corr, el jefe final, además de enemigos registrados.",
    characters: ["Lucius Corr"],
    color: "#d76b61",
  },
];

export default function LevelsPage() {
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
              Tres etapas de operación en el universo industrial de Vaporlock.
              Los detalles visuales y los objetivos específicos se definirán
              durante el desarrollo.
            </p>
          </div>

          <div className="levels-counter">
            <span>OPERACIONES REGISTRADAS</span>
            <strong>03</strong>
            <div className="levels-counter-bars">
              <i />
              <i />
              <i />
            </div>
          </div>
        </motion.header>

        <section className="levels-section">
          <div className="levels-section-heading">
            <div>
              <span className="levels-section-label">ARCHIVO DE OPERACIONES</span>
              <h2>Selección de nivel</h2>
            </div>
            <span className="levels-total">03 REGISTROS</span>
          </div>

          <div className="levels-grid">
            {levels.map((level, index) => (
              <motion.article
                className="level-card"
                key={level.number}
                style={{ "--level-color": level.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
              >
                <div className="level-card-top">
                  <span className="level-number">{level.number}</span>
                  <span className="level-status">{level.status}</span>
                </div>

                <div className="level-card-icon">
                  <Map size={25} strokeWidth={1.5} />
                </div>

                <h3>{level.title}</h3>
                <p className="level-description">{level.description}</p>

                <div className="level-divider" />

                <div className="level-characters">
                  <span>PERSONAJES REGISTRADOS</span>
                  <ul>
                    {level.characters.map((character) => (
                      <li key={character}>{character}</li>
                    ))}
                  </ul>
                </div>

                <div className="level-card-footer">
                  <LockKeyhole size={14} />
                  <span>INFORMACIÓN EN DESARROLLO</span>
                </div>
              </motion.article>
            ))}
          </div>
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