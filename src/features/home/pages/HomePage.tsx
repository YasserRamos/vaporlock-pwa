
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  Flame,
  Gamepad2,
  Cog,
  Shield,
  Zap,
  Crosshair,
  Skull,
} from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    number: "01",
    category: "EL UNIVERSO",
    title: "UNA CIUDAD EN PELIGRO",
    description:
      "Explora Metronia, una ciudad industrial donde el vapor, las máquinas y la tecnología ocultan una lucha por el control.",
    href: "/historia",
    label: "Descubrir la historia",
    icon: Cog,
    accent: "copper",
    stamp: "EXPEDIENTE 01",
  },
  {
    number: "02",
    category: "LOS PROTAGONISTAS",
    title: "ALIADOS Y ENEMIGOS",
    description:
      "Conoce a Jack Veil, a quienes luchan a su lado y a las fuerzas que protegen los intereses de Vaporis Industries.",
    href: "/personajes",
    label: "Ver personajes",
    icon: Shield,
    accent: "teal",
    stamp: "EXPEDIENTE 02",
  },
  {
    number: "03",
    category: "SUPERVIVENCIA",
    title: "LUCHA POR SOBREVIVIR",
    description:
      "Corre, salta y combate. Recoge energía y combustible para recuperar salud y potenciar tus ataques.",
    href: "/niveles",
    label: "Explorar niveles",
    icon: Crosshair,
    accent: "red",
    stamp: "EXPEDIENTE 03",
  },
];

const specs = [
  { label: "GÉNERO", value: "Acción y plataformas" },
  { label: "ESTILO", value: "Pixel art · Steampunk" },
  { label: "MUNDO", value: "Metronia" },
  { label: "AÑO", value: "2943" },
];

export default function HomePage() {
  return (
    <main className="vl-home">
      {/* HERO */}
      <section id="inicio" className="vl-hero pixel-texture">
        <div className="vl-hero__blueprint" aria-hidden="true" />
        <div className="vl-hero__scanlines" aria-hidden="true" />

        <div className="vl-hero__content">
          <motion.div
            className="vl-hero__copy"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="vl-status">
              <span className="vl-status__light" />
              <span>ARCHIVO DE METRONIA</span>
              <span className="vl-status__separator">/</span>
              <span>2943</span>
            </div>

            <p className="vl-eyebrow">
              <span className="vl-eyebrow__line" />
              EL FUTURO FUNCIONA A VAPOR
            </p>

            <h1 className="vl-hero-title">
              <span>VAPORLOCK</span>
            </h1>

            <div className="vl-title-caption">
              <span className="vl-title-caption__symbol">✦</span>
              UNA CIUDAD. UNA CORPORACIÓN. UNA REVOLUCIÓN.
              <span className="vl-title-caption__symbol">✦</span>
            </div>

            <p className="vl-hero__description">
              Metronia está bajo el control de una corporación. Mientras
              la ciudad se consume entre máquinas y vapor, Jack Veil se
              convierte en la última oportunidad para cambiar su destino.
            </p>

            <div className="vl-hero__actions">
              <Link to="/historia" className="vl-button vl-button--primary">
                <span>INICIAR AVENTURA</span>
                <ArrowRight size={19} />
              </Link>

              <Link to="/personajes" className="vl-button vl-button--outline">
                <Gamepad2 size={19} />
                <span>VER PERSONAJES</span>
              </Link>
            </div>

            <div className="vl-hero__metadata">
              <span><span className="vl-pixel-dot" /> ACCIÓN 2D</span>
              <span><span className="vl-pixel-dot" /> MUNDO STEAMPUNK</span>
              <span><span className="vl-pixel-dot" /> PIXEL ART</span>
            </div>
          </motion.div>

          {/* FICHA DEL PROTAGONISTA */}
          <motion.div
            className="vl-character"
            initial={{ opacity: 0, y: 24, rotate: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            <div className="vl-character__backplate" />

            <div className="vl-character__frame">
              <div className="vl-character__topbar">
                <span>VAPORIS // DATABASE</span>
                <span className="vl-character__record">N.º 001</span>
              </div>

              <div className="vl-character__scene">
                <div className="vl-character__sun" />
                <div className="vl-character__city vl-character__city--far" />
                <div className="vl-character__city vl-character__city--near" />

                <div className="vl-character__gear vl-character__gear--one">
                  <Cog size={62} strokeWidth={1.1} />
                </div>
                <div className="vl-character__gear vl-character__gear--two">
                  <Cog size={42} strokeWidth={1.2} />
                </div>

                <div className="vl-character__energy" />
                <div className="vl-character__portrait">
                  <Shield size={96} strokeWidth={1.2} />
                  <Zap
                    className="vl-character__bolt"
                    size={36}
                    fill="currentColor"
                  />
                </div>

                <div className="vl-character__crosshair vl-character__crosshair--left" />
                <div className="vl-character__crosshair vl-character__crosshair--right" />

                <span className="vl-character__scene-label">
                  <span className="vl-pixel-dot" />
                  SIGNAL DETECTED
                </span>
              </div>

              <div className="vl-character__identity">
                <div>
                  <p className="vl-character__kicker">EXPEDIENTE DEL PROTAGONISTA</p>
                  <h2>JACK VEIL</h2>
                </div>
                <div className="vl-character__danger">
                  <Flame size={20} />
                  <span>EN<br />MISIÓN</span>
                </div>
              </div>

              <p className="vl-character__description">
                Su objetivo: destruir los suministros de energía de
                Vaporis Industries y derrotar a Lucius Corr.
              </p>

              <div className="vl-character__footer">
                <span><Skull size={14} /> OBJETIVO: LUCIUS CORR</span>
                <span>MV-2943</span>
              </div>
            </div>

            <div className="vl-sticker vl-sticker--top">CLASSIFIED</div>
            <div className="vl-sticker vl-sticker--bottom">PLAYER ONE</div>
          </motion.div>
        </div>

        <div className="vl-hero__bottomline">
          <span>METRONIA INDUSTRIAL DISTRICT</span>
          <a href="#universo" className="vl-scroll">
            <span>DESPLAZARSE</span>
            <ArrowDown size={16} />
          </a>
          <span>VAPORLOCK // 2943</span>
        </div>
      </section>

      {/* INFORMACIÓN DEL JUEGO */}
      <section id="universo" className="vl-universe">
        <div className="vl-section-heading">
          <div>
            <p className="vl-eyebrow">
              <span className="vl-eyebrow__line" />
              BIENVENIDO A METRONIA
            </p>
            <h2>
              UNA CIUDAD
              <br />
              <span>AL BORDE DEL COLAPSO.</span>
            </h2>
          </div>

          <p className="vl-section-heading__note">
            // INFORME DE SITUACIÓN
            <br />
            <span>LA REVOLUCIÓN COMIENZA CONTIGO.</span>
          </p>
        </div>

        <div className="vl-universe__intro">
          <div className="vl-universe__mark">
            <Cog size={48} strokeWidth={1.3} />
            <span>VL</span>
          </div>
          <p>
            <strong>Vaporlock</strong> es un videojuego de acción y
            plataformas en 2D ambientado en un futuro steampunk. Explora
            una ciudad industrial, enfréntate a sus peligros y descubre
            qué ocurre cuando la tecnología se convierte en una herramienta
            de control.
          </p>
        </div>

        <div className="vl-feature-grid">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.number}
                className={`vl-feature vl-feature--${item.accent}`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
              >
                <div className="vl-feature__top">
                  <span className="vl-feature__number">{item.number}</span>
                  <span className="vl-feature__stamp">{item.stamp}</span>
                </div>

                <div className="vl-feature__icon">
                  <Icon size={42} strokeWidth={1.5} />
                  <span className="vl-feature__icon-pixel" />
                </div>

                <p className="vl-feature__category">{item.category}</p>
                <h3>{item.title}</h3>
                <p className="vl-feature__description">{item.description}</p>

                <Link to={item.href} className="vl-feature__link">
                  <span>{item.label}</span>
                  <ArrowRight size={18} />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* FICHA TÉCNICA */}
      <section className="vl-specs">
        <div className="vl-specs__heading">
          <span className="vl-pixel-dot" />
          <span>DATOS DEL PROYECTO</span>
          <span className="vl-specs__line" />
          <span>V-2943</span>
        </div>

        <div className="vl-specs__grid">
          {specs.map((spec, index) => (
            <div className="vl-spec" key={spec.label}>
              <span className="vl-spec__index">0{index + 1}</span>
              <p>{spec.label}</p>
              <h3>{spec.value}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* LLAMADA A LA ACCIÓN */}
      <section className="vl-cta">
        <div className="vl-cta__pattern" aria-hidden="true" />

        <div className="vl-cta__content">
          <div className="vl-cta__symbol">
            <Zap size={52} fill="currentColor" />
          </div>

          <div className="vl-cta__copy">
            <p className="vl-eyebrow">
              <span className="vl-eyebrow__line" />
              EL DESTINO DE METRONIA ESTÁ EN JUEGO
            </p>
            <h2>HAZ RUIDO.<br />CAMBIA EL FUTURO.</h2>
            <p>La maquinaria del poder no se detendrá por sí sola.</p>
          </div>

          <Link to="/historia" className="vl-button vl-button--dark">
            <span>CONOCER LA MISIÓN</span>
            <ArrowRight size={19} />
          </Link>
        </div>

        <div className="vl-cta__bottom">
          <span>END OF TRANSMISSION</span>
          <span>/// VAPORLOCK ///</span>
        </div>
      </section>
    </main>
  );
}
