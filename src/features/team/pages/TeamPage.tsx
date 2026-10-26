
import { motion } from "motion/react";
import {
  ArrowLeft,
  Users,
  Palette,
  Code2,
  Clapperboard,
  Music2,
  BookOpen,
  Bug,
  ClipboardList,
} from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import "../css/team.css";

const departments = [
  {
    number: "01",
    title: "Diseño",
    icon: Palette,
    color: "#e99545",
    people: [
      "Juan Jose Canché Ay",
      "Alexander David Rosales Pacheco",
    ],
    tasks: [
      "Definir las mecánicas del juego.",
      "Diseñar habilidades y ataques.",
      "Definir los sistemas de juego.",
    ],
  },
  {
    number: "02",
    title: "Programación",
    icon: Code2,
    color: "#39d5cb",
    people: ["Yasser Omar Apango Ramos"],
    tasks: [
      "Implementar las mecánicas en Unity.",
      "Desarrollar los sistemas del videojuego.",
    ],
  },
  {
    number: "03",
    title: "Arte",
    icon: Palette,
    color: "#e99545",
    people: [
      "Juan Jose Canché Ay",
      "Alexander David Rosales Pacheco",
      "Gustavo Lopez Alvarado",
      "Miguel Angel Cordova Sanchez",
    ],
    tasks: [
      "Crear personajes y enemigos.",
      "Diseñar armas e ítems.",
      "Crear los fondos del videojuego.",
    ],
  },
  {
    number: "04",
    title: "Animación",
    icon: Clapperboard,
    color: "#39d5cb",
    people: ["Gustavo Lopez Alvarado"],
    tasks: [
      "Crear animaciones de personajes y enemigos.",
      "Integrar las animaciones en el videojuego.",
    ],
  },
  {
    number: "05",
    title: "Audio",
    icon: Music2,
    color: "#e99545",
    people: ["Juan Jose Canché Ay"],
    tasks: [
      "Crear efectos de sonido.",
      "Integrar los recursos de audio.",
    ],
  },
  {
    number: "06",
    title: "Narrativa",
    icon: BookOpen,
    color: "#39d5cb",
    people: [
      "Alexander David Rosales Pacheco",
      "Miguel Angel Cordova Sanchez",
    ],
    tasks: [
      "Desarrollar la historia.",
      "Documentar personajes y elementos narrativos.",
    ],
  },
  {
    number: "07",
    title: "QA",
    icon: Bug,
    color: "#e99545",
    people: ["Yasser Omar Apango Ramos"],
    tasks: [
      "Comprobar el funcionamiento del videojuego.",
      "Detectar errores.",
      "Verificar las correcciones.",
    ],
  },
  {
    number: "08",
    title: "Gestión",
    icon: ClipboardList,
    color: "#39d5cb",
    people: ["Miguel Angel Cordova Sanchez"],
    tasks: [
      "Coordinar las tareas.",
      "Dar seguimiento al avance.",
      "Organizar los entregables.",
    ],
  },
];

export default function TeamPage() {
  return (
    <main className="team-page">
      <div className="team-pixel-background" aria-hidden="true" />

      <div className="team-container">
        <Link to="/" className="team-back">
          <ArrowLeft size={18} />
          <span>VOLVER AL INICIO</span>
        </Link>

        <header className="team-header">
          <div className="team-heading-copy">
            <div className="team-file-label">
              <span className="team-pixel-dot" />
              ARCHIVO DE METRONIA
              <span className="team-label-divider">//</span>
              PERSONAL
            </div>

            <p className="team-eyebrow">DETRÁS DEL PROYECTO</p>

            <h1>
              EQUIPO
              <span>VAPORLOCK</span>
            </h1>

            <p className="team-intro">
              Las personas y disciplinas que dan forma al videojuego:
              desde el diseño de sus sistemas hasta su desarrollo,
              narrativa y control de calidad.
            </p>
          </div>

          <div className="team-header-stats">
            <div className="team-stat-main">
              <Users size={29} strokeWidth={1.7} />
              <span>ÁREAS DE TRABAJO</span>
              <strong>08</strong>
            </div>

            <div className="team-stat-bottom">
              <span>METRONIA</span>
              <span>REGISTRO // 2943</span>
            </div>

            <div className="team-pixel-decoration" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </header>

        <section className="team-directory">
          <div className="team-directory-heading">
            <div>
              <span className="team-section-kicker">
                <span className="team-pixel-dot" />
                DIRECTORIO DEL PROYECTO
              </span>
              <h2>ROLES Y RESPONSABILIDADES</h2>
            </div>

            <span className="team-total">08 DEPARTAMENTOS</span>
          </div>

          <div className="team-department-grid">
            {departments.map((department, index) => {
              const Icon = department.icon;

              return (
                <motion.article
                  key={department.number}
                  className="team-department"
                  style={
                    { "--department-color": department.color } as CSSProperties
                  }
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.3,
                    delay: (index % 2) * 0.07,
                  }}
                >
                  <div className="team-department-header">
                    <span className="team-department-number">
                      {department.number}
                    </span>

                    <div className="team-department-title">
                      <span>DEPARTAMENTO</span>
                      <h3>{department.title}</h3>
                    </div>

                    <div className="team-department-icon">
                      <Icon size={23} strokeWidth={1.8} />
                    </div>
                  </div>

                  <div className="team-department-content">
                    <div className="team-members">
                      <h4>INTEGRANTES</h4>
                      <ul>
                        {department.people.map((person) => (
                          <li key={person}>{person}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="team-responsibilities">
                      <h4>RESPONSABILIDADES</h4>
                      <ul>
                        {department.tasks.map((task) => (
                          <li key={task}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="team-department-footer">
                    <span className="team-status-indicator" />
                    ÁREA REGISTRADA
                    <span className="team-footer-code">
                      VL_{department.number}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <footer className="team-footer">
          <div className="team-footer-copy">
            <span>VAPORLOCK // 2943</span>
            <h2>UNA CIUDAD. MUCHAS DISCIPLINAS.</h2>
            <p>
              Diseño, tecnología y creatividad reunidos en un mismo proyecto.
            </p>
          </div>

          <div className="team-footer-pixel" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </footer>
      </div>
    </main>
  );
}
