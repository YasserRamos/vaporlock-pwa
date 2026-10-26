import { Link } from "react-router-dom";
import { ArrowUp, Cog } from "lucide-react";

const footerLinks = [
  { label: "Inicio", to: "/" },
  { label: "Historia", to: "/historia" },
  { label: "Personajes", to: "/personajes" },
  { label: "Niveles", to: "/niveles" },
  { label: "Galería", to: "/galeria" },
  { label: "Equipo", to: "/equipo" },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-[var(--vl-panel)] text-[var(--vl-paper)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 md:px-10">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-3xl font-black uppercase tracking-tight"
          >
            <Cog size={30} className="text-amber-400" />
            VAPOR<span className="text-amber-400">LOCK</span>
          </Link>

          <p className="mt-4 max-w-md text-sm leading-6 text-[var(--vl-muted)]">
            Una aventura de acción y plataformas en 2D ambientada en
            Metronia, una ciudad steampunk futurista del año 2943.
          </p>

          <p className="mt-5 font-mono text-xs uppercase tracking-widest text-amber-400">
            Universidad Tecnológica de Cancún · Integradora III
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-black uppercase tracking-widest">
            Explorar Vaporlock
          </h2>

          <nav aria-label="Enlaces del pie de página" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-[var(--vl-muted)] transition-colors hover:text-amber-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-black/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-[var(--vl-muted)] sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p>Vaporlock · Proyecto académico</p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 self-start font-bold uppercase transition-colors hover:text-amber-400 sm:self-auto"
          >
            Volver arriba
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
