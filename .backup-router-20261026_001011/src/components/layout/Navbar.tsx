import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronRight } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Historia", href: "#historia" },
  { label: "Personajes", href: "#personajes" },
  { label: "Niveles", href: "#niveles" },
  { label: "Galeria", href: "#galeria" },
  { label: "Equipo", href: "#equipo" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b-4 border-black bg-[#11131a]/95 backdrop-blur-md">
      <nav
        className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10"
        aria-label="Navegacion principal"
      >
        <a
          href="#inicio"
          onClick={closeMenu}
          className="shrink-0 leading-none"
          aria-label="Vaporlock, inicio"
        >
          <span className="block -rotate-2 text-xl font-black italic tracking-tight text-[#f4e8cf] sm:text-2xl">
            VAPOR<span className="text-[#e38a42]">LOCK</span>
          </span>
          <span className="mt-1 block text-[9px] font-bold tracking-[0.28em] text-[#b8b1a3]">
            METRONIA // 2943
          </span>
        </a>

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-black uppercase tracking-wider text-[#d4cbbb] transition-colors hover:text-[#e38a42] xl:text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#juego"
          className="comic-button hidden bg-[#bd4034] text-xs text-white sm:inline-flex"
        >
          Descubre el juego <ChevronRight size={16} />
        </a>

        <button
          type="button"
          className="flex size-11 items-center justify-center border-2 border-[#f4e8cf] text-[#f4e8cf] lg:hidden"
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t-2 border-[#39343a] bg-[#171922] lg:hidden"
          >
            <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 py-4 sm:px-6">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ x: -8, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.025 }}
                  className="border-b border-white/10 px-3 py-3 text-sm font-black uppercase tracking-widest text-[#f4e8cf] hover:bg-white/5 hover:text-[#e38a42]"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#juego"
                onClick={closeMenu}
                className="comic-button mt-3 bg-[#bd4034] text-white"
              >
                Descubre el juego <ChevronRight size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
