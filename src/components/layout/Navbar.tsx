import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronRight } from "lucide-react";
import VaporlockLogo from "../VaporlockLogo.ts/VaporlockLogo";

const links = [
  { label: "Inicio", to: "/" },
  { label: "Historia", to: "/historia" },
  { label: "Personajes", to: "/personajes" },
  { label: "Niveles", to: "/niveles" },
  { label: "Galeria", to: "/galeria" },
  { label: "Equipo", to: "/equipo" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-xs font-black uppercase tracking-wider transition-colors xl:text-sm ${
      isActive ? "text-[#e38a42]" : "text-[#d4cbbb] hover:text-[#e38a42]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b-4 border-black bg-[#11131a]/95 backdrop-blur-md">
      <nav
        className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10"
        aria-label="Navegacion principal"
      >
        <Link to="/" onClick={closeMenu} className="shrink-0 leading-none">
          <span className="block -rotate-2 text-xl font-black italic tracking-tight text-[#f4e8cf] sm:text-2xl">
            <VaporlockLogo />
          </span>
          <span className="mt-1 block text-[9px] font-bold tracking-[0.28em] text-[#b8b1a3]">
            METRONIA // 2943
          </span>
        </Link>

        <div className="hidden items-center gap-4 lg:flex xl:gap-6">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/personajes"
          className="comic-button hidden bg-[#bd4034] text-xs text-white sm:inline-flex"
        >
          Explorar <ChevronRight size={16} />
        </Link>

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
                <motion.div
                  key={link.to}
                  initial={{ x: -8, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.025 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block border-b border-white/10 px-3 py-3 text-sm font-black uppercase tracking-widest ${
                        isActive ? "bg-white/5 text-[#e38a42]" : "text-[#f4e8cf] hover:text-[#e38a42]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <Link
                to="/personajes"
                onClick={closeMenu}
                className="comic-button mt-3 bg-[#bd4034] text-white"
              >
                Explorar personajes <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
