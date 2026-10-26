
import { motion } from "motion/react";
import { ArrowLeft, ArrowDown, Cog, Factory, Zap, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/story.css";

const events = [
  {
    number: "01",
    label: "EL ESCENARIO",
    title: "Metronia",
    description:
      "En el año 2943, Metronia es una ciudad industrial futurista donde la tecnología avanzada convive con las máquinas de vapor.",
    icon: Factory,
    color: "#d99448",
  },
  {
    number: "02",
    label: "EL CONFLICTO",
    title: "Vaporis Industries",
    description:
      "Una poderosa corporación concentra el poder industrial. Jack Veil debe destruir sus suministros de energía para detener sus operaciones.",
    icon: Zap,
    color: "#28d5cf",
  },
  {
    number: "03",
    label: "LA MISIÓN",
    title: "Jack Veil contra Lucius Corr",
    description:
      "Jack Veil debe enfrentarse a Lucius Corr y detener a Vaporis Industries para salvar Metronia.",
    icon: ShieldAlert,
    color: "#e45d46",
  },
];

export default function StoryPage() {
  return (
    <main className="story-page">
      <div className="story-background-grid" aria-hidden="true" />

      <div className="story-container">
        <Link to="/" className="story-back">
          <ArrowLeft size={17} />
          <span>VOLVER AL INICIO</span>
        </Link>

        <header className="story-hero">
          <div className="story-hero-copy">
            <div className="story-file-tag">
              <span className="story-status-light" />
              ARCHIVO DE METRONIA <span>/</span> 2943
            </div>

            <p className="story-eyebrow">EXPEDIENTE HISTÓRICO // 001</p>

            <h1>
              UNA CIUDAD
              <br />
              <span>BAJO CONTROL</span>
            </h1>

            <div className="story-title-divider">
              <span />
              <span />
              <span />
            </div>

            <p className="story-intro">
              Metronia, año 2943. La tecnología avanzada y las máquinas de
              vapor sostienen una ciudad marcada por el poder industrial.
            </p>

            <div className="story-hero-footer">
              <span>REGISTRO HISTÓRICO</span>
              <span>VL // 2943</span>
            </div>
          </div>


          <div className="story-hero-art" aria-hidden="true">
            <div className="story-art-topline">
              <span><span className="story-status-light" /> SISTEMA ACTIVO</span>
              <span>MT-2943 / 001</span>
            </div>

            <div className="story-art-ruler story-art-ruler-left">
              <span>100</span>
              <span>075</span>
              <span>050</span>
              <span>025</span>
            </div>

            <div className="story-art-orbit story-art-orbit-one" />
            <div className="story-art-orbit story-art-orbit-two" />

            <div className="story-art-cross story-art-cross-one" />
            <div className="story-art-cross story-art-cross-two" />

            <Cog className="story-art-gear story-art-gear-one" />
            <Cog className="story-art-gear story-art-gear-two" />

            <div className="story-art-core">
              <div className="story-art-core-frame">
                <Factory size={82} strokeWidth={1} />
                <div className="story-art-core-scan" />
              </div>
              <span>METRONIA</span>
              <strong>2943</strong>
              <small>SECTOR INDUSTRIAL</small>
            </div>

            <div className="story-art-side-label">
              <span>COORDENADAS</span>
              <strong>MET // 001</strong>
              <span>ESTADO DEL SISTEMA</span>
              <strong className="story-art-online">EN OPERACIÓN</strong>
            </div>

            <div className="story-art-bottom">
              <div>
                <span>01</span>
                <strong>CIUDAD</strong>
              </div>
              <div>
                <span>02</span>
                <strong>INDUSTRIA</strong>
              </div>
              <div>
                <span>03</span>
                <strong>CONFLICTO</strong>
              </div>
              <Zap size={22} />
            </div>

            <div className="story-art-caption">
              <span>VAPORLOCK / ARCHIVO VISUAL</span>
              <span>ACCESO RESTRINGIDO</span>
            </div>
          </div>

        </header>

        <section className="story-timeline-section">
          <div className="story-section-heading">
            <div>
              <span className="story-section-kicker">ARCHIVOS RECUPERADOS</span>
              <h2>EL ORIGEN DEL CONFLICTO</h2>
            </div>
            <span className="story-record-count">03 / REGISTROS</span>
          </div>

          <div className="story-timeline">
            {events.map((event, index) => {
              const Icon = event.icon;

              return (
                <motion.article
                  key={event.number}
                  className="story-event"
                  style={{ "--event-color": event.color } as React.CSSProperties}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.12 }}
                >
                  <div className="story-event-marker">
                    <span>{event.number}</span>
                    {index !== events.length - 1 && (
                      <div className="story-event-connector">
                        <ArrowDown size={15} />
                      </div>
                    )}
                  </div>

                  <div className="story-event-card">
                    <div className="story-event-top">
                      <span>{event.label}</span>
                      <Icon size={23} strokeWidth={1.6} />
                    </div>

                    <h3>{event.title}</h3>
                    <p>{event.description}</p>

                    <div className="story-event-bottom">
                      <span>ARCHIVO // {event.number}</span>
                      <span className="story-event-status">
                        <span />
                        REGISTRO CONFIRMADO
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="story-closing">
          <div className="story-closing-pattern" aria-hidden="true" />

          <div className="story-closing-copy">
            <span>EL DESTINO DE METRONIA ESTÁ EN JUEGO</span>
            <h2>CONOCE A LOS IMPLICADOS</h2>
            <p>
              Descubre a Jack Veil, Lucius Corr y los personajes que forman
              parte de este conflicto.
            </p>
          </div>

          <Link to="/personajes" className="story-closing-button">
            VER PERSONAJES <span>→</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
