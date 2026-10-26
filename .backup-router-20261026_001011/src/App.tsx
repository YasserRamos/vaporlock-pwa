import CharactersPage from './features/characters/pages/CharactersPage';
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Cog, Flame, Zap } from "lucide-react";
import Navbar from "./components/layout/Navbar";
import ComicPanel from "./components/ui/ComicPanel";

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const characters = [
  {
    name: "Jack Veil",
    role: "El protagonista",
    color: "red" as const,
    symbol: "JV",
    description: "Deten a Vaporis Industries y lucha por el futuro de Metronia.",
  },
  {
    name: "Lucius Corr",
    role: "La amenaza",
    color: "orange" as const,
    symbol: "LC",
    description: "El principal objetivo de la mision de Jack.",
  },
  {
    name: "El medico",
    role: "Asistencia",
    color: "teal" as const,
    symbol: "+",
    description: "Un aliado que proporciona asistencia durante la aventura.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#e38a42]">
        {eyebrow}
      </p>
      <h2 className="comic-heading text-3xl text-[#f4e8cf] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-7 text-[#b8b1a3] sm:text-base">
        {description}
      </p>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen overflow-clip bg-[#11131a] text-[#f4e8cf]">
      <Navbar />

      <main>
        <section
          id="inicio"
          className="hero-grid relative isolate border-b-4 border-black"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_35%,#a9432c33,transparent_48%),linear-gradient(125deg,#11131a,#202431_60%,#11131a)]" />
          <div className="mx-auto grid min-h-[590px] max-w-[1440px] items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:py-24 lg:px-14">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={reveal}
              transition={{ duration: 0.55 }}
            >
              <div className="mb-6 inline-flex -rotate-2 items-center gap-2 border-2 border-black bg-[#e38a42] px-3 py-2 text-xs font-black uppercase tracking-widest text-[#11131a] shadow-[4px_4px_0_#000]">
                <Zap size={15} /> Una ciudad al borde del colapso
              </div>

              <h1 className="comic-heading max-w-3xl text-5xl sm:text-6xl md:text-7xl xl:text-8xl">
                EL VAPOR
                <br />
                <span className="text-[#bd4034]">NO OLVIDA.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#d0c8ba] sm:text-lg sm:leading-8">
                Metronia, año 2943. Una ciudad de maquinas, energia y poder.
                Jack Veil debe enfrentarse a Vaporis Industries antes de que
                su control lo consuma todo.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#historia" className="comic-button bg-[#bd4034] text-white">
                  Explorar la historia <ArrowUpRight size={18} />
                </a>
                <a href="#personajes" className="comic-button bg-[#f4e8cf] text-[#11131a]">
                  Conocer personajes
                </a>
              </div>

              <div className="mt-9 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#b8b1a3]">
                <span className="h-1 w-9 bg-[#5ca8a0]" />
                Accion // Aventura // Plataformas
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: 1.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="relative mx-auto w-full max-w-xl"
            >
              <div className="absolute -right-2 -top-3 z-10 rotate-6 border-3 border-black bg-[#e38a42] px-4 py-2 text-sm font-black text-black shadow-[4px_4px_0_#000] sm:-right-4">
                ISSUE #001
              </div>

              <div className="comic-border relative min-h-[320px] overflow-hidden bg-[#202b38] sm:min-h-[410px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#e38a4266,transparent_22%),linear-gradient(180deg,#253c50_0%,#1c2734_50%,#11131a_100%)]" />
                <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(#f4e8cf_1px,transparent_1px)] [background-size:6px_6px]" />

                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[#11131a] [clip-path:polygon(0_65%,12%_40%,22%_52%,32%_20%,43%_42%,55%_12%,66%_48%,79%_28%,90%_44%,100%_18%,100%_100%,0_100%)]" />

                <div className="absolute bottom-0 left-[12%] h-[48%] w-[13%] border-x-4 border-t-4 border-black bg-[#343946]" />
                <div className="absolute bottom-0 left-[31%] h-[65%] w-[15%] border-x-4 border-t-4 border-black bg-[#252a36]" />
                <div className="absolute bottom-0 right-[12%] h-[54%] w-[19%] border-x-4 border-t-4 border-black bg-[#3b3030]" />

                <div className="absolute bottom-[16%] left-[17%] h-2 w-2 bg-[#e38a42] shadow-[15px_0_0_#e38a42,30px_0_0_#e38a42,0_20px_0_#e38a42,30px_20px_0_#e38a42]" />
                <div className="absolute bottom-[20%] right-[19%] h-2 w-2 bg-[#5ca8a0] shadow-[15px_0_0_#5ca8a0,0_18px_0_#5ca8a0]" />

                <div className="absolute bottom-[8%] left-1/2 flex -translate-x-1/2 flex-col items-center">
                  <div className="h-3 w-8 border-2 border-black bg-[#e38a42]" />
                  <div className="h-20 w-12 border-4 border-black bg-[#252a36] sm:h-28 sm:w-16" />
                  <div className="h-4 w-16 bg-[#bd4034] sm:w-20" />
                </div>

                <div className="absolute left-4 top-4 border-2 border-[#f4e8cf] bg-[#11131a]/85 px-3 py-2 text-[10px] font-black uppercase tracking-widest sm:left-6 sm:top-6">
                  Metronia / 2943
                </div>

                <div className="absolute bottom-4 left-4 right-4 border-l-4 border-[#bd4034] bg-[#11131a]/90 p-3 sm:bottom-6 sm:left-6 sm:right-6 sm:p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#e38a42]">
                    Una nueva era industrial
                  </p>
                  <p className="mt-1 text-xl font-black uppercase italic sm:text-2xl">
                    El futuro tiene un precio.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-[#b8b1a3]">
                <span>Vaporlock universe</span>
                <span>Pixel art / Comic style</span>
              </div>
            </motion.div>
          </div>
          <a
            href="#historia"
            className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#b8b1a3] md:flex"
          >
            Descubre Metronia <ArrowDown size={14} />
          </a>
        </section>

        <section id="historia" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-14">
          <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center">
            <div>
              <SectionHeading
                eyebrow="Archivo de Metronia / 001"
                title="Una ciudad. Una corporacion. Una rebelion."
                description="En el año 2943, la tecnologia impulsa Metronia, pero el control de sus recursos amenaza el futuro de la ciudad."
              />
              <a href="#personajes" className="comic-button bg-[#f4e8cf] text-[#11131a]">
                Conoce a sus protagonistas <ArrowUpRight size={17} />
              </a>
            </div>

            <ComicPanel className="pixel-texture rotate-[0.5deg] p-6 sm:p-9" accent="red">
              <div className="mb-5 flex items-center gap-3">
                <Cog className="text-[#e38a42]" size={27} />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#e38a42]">
                  Informe clasificado
                </span>
              </div>
              <p className="text-lg font-bold leading-8 text-[#f4e8cf] sm:text-xl">
                Vaporis Industries controla una parte decisiva del poder
                energetico. Jack Veil emprende una mision para destruir sus
                suministros y detener a Lucius Corr.
              </p>
              <div className="mt-7 border-t-2 border-dashed border-white/20 pt-4 text-xs uppercase tracking-widest text-[#b8b1a3]">
                Estado del informe: mision en curso
              </div>
            </ComicPanel>
          </div>
        </section>

        <CharactersPage />

<section id="niveles" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-24 lg:px-14">
          <SectionHeading
            eyebrow="Zonas de operacion"
            title="Tres etapas. Un solo objetivo."
            description="El viaje de Jack se desarrolla a traves de tres niveles. Los detalles de cada zona se incorporaran conforme se definan los escenarios."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { number: "01", title: "El comienzo", color: "border-[#bd4034]", note: "Inicio de la mision" },
              { number: "02", title: "Zona industrial", color: "border-[#e38a42]", note: "El conflicto se intensifica" },
              { number: "03", title: "El nucleo", color: "border-[#5ca8a0]", note: "El enfrentamiento final" },
            ].map((level) => (
              <a
                key={level.number}
                href="#juego"
                className={`comic-panel group ${level.color} border-t-[6px] p-5 transition-transform hover:-translate-y-1`}
              >
                <div className="pixel-texture flex aspect-video items-end justify-between border-2 border-black bg-gradient-to-br from-[#303d4c] to-[#171922] p-4">
                  <span className="comic-heading text-6xl text-white/20">{level.number}</span>
                  <ArrowUpRight className="text-[#e38a42] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <h3 className="mt-5 text-xl font-black uppercase">{level.title}</h3>
                <p className="mt-2 text-sm text-[#b8b1a3]">{level.note}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="galeria" className="border-y-4 border-black bg-[#191c25]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-24 lg:px-14">
            <SectionHeading
              eyebrow="Material visual"
              title="El mundo de Vaporlock"
              description="Capturas, sprites, ilustraciones y avances del desarrollo se mostraran aqui."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="comic-panel pixel-texture flex min-h-52 items-end bg-gradient-to-br from-[#39495a] to-[#171922] p-5 sm:min-h-64">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#e38a42]">Arte del juego</p>
                  <h3 className="mt-2 text-xl font-black uppercase">Escenarios industriales</h3>
                </div>
              </div>
              <div className="comic-panel pixel-texture flex min-h-52 items-end bg-gradient-to-br from-[#563d39] to-[#171922] p-5 sm:min-h-64">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#5ca8a0]">Desarrollo</p>
                  <h3 className="mt-2 text-xl font-black uppercase">Sprites y animaciones</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="juego" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-24 lg:px-14">
          <div className="comic-panel pixel-texture overflow-hidden bg-[#bd4034] p-7 sm:p-12 md:p-16">
            <Flame className="mb-5" size={34} />
            <p className="text-xs font-black uppercase tracking-[0.25em]">La revolucion comienza</p>
            <h2 className="comic-heading mt-4 max-w-3xl text-4xl text-white sm:text-5xl md:text-7xl">
              METRONIA NO SE RENDIRA.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
              Sigue el desarrollo de Vaporlock y descubre el universo de Jack Veil.
            </p>
            <a href="#equipo" className="comic-button mt-7 bg-[#f4e8cf] text-[#11131a]">
              Conocer el proyecto <ArrowUpRight size={18} />
            </a>
          </div>
        </section>

        <section id="equipo" className="border-t-4 border-black bg-[#191c25]">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-14">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#e38a42]">
              Detras de las maquinas
            </p>
            <h2 className="comic-heading mt-3 text-3xl sm:text-4xl">Equipo Vaporlock</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#b8b1a3]">
              Un proyecto de desarrollo de videojuegos que combina programacion,
              diseno, arte, animacion, audio, narrativa y pruebas.
            </p>
            <footer className="mt-12 flex flex-col justify-between gap-4 border-t-2 border-white/10 pt-5 text-xs font-bold uppercase tracking-wider text-[#b8b1a3] sm:flex-row">
              <span>VAPORLOCK // METRONIA 2943</span>
              <span>Accion. Aventura. Plataformas.</span>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

