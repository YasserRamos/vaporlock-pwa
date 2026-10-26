
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronRight } from "lucide-react";
import VaporlockLogo from "../ui/VaporlockLogo";
import "./css/navbar.css";

const links = [
    { label: "Inicio", to: "/" },
    { label: "Historia", to: "/historia" },
    { label: "Personajes", to: "/personajes" },
    { label: "Niveles", to: "/niveles" },
    { label: "Galería", to: "/galeria" },
    { label: "Equipo", to: "/equipo" },
    { label: "Noticias", to: "/noticias" }
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const closeMenu = () => setOpen(false);

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `navbar-link ${isActive ? "is-active" : ""}`;

    return (
        <header className="navbar">
            <div className="navbar-topline" aria-hidden="true" />

            <nav className="navbar-inner" aria-label="Navegación principal">
                <Link to="/" onClick={closeMenu} className="navbar-brand">
                    <span className="navbar-brand-logo">
                        <VaporlockLogo />
                    </span>
                    <span className="navbar-brand-subtitle">
                        <span className="navbar-brand-dot" />
                        METRONIA <span>//</span> 2943
                    </span>
                </Link>

                <div className="navbar-links">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === "/"}
                            className={linkClass}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <Link to="/personajes" className="navbar-explore">
                    <span>Explorar</span>
                    <ChevronRight size={16} />
                </Link>

                <button
                    type="button"
                    className="navbar-menu-toggle"
                    aria-label={open ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={open}
                    aria-controls="mobile-navigation"
                    onClick={() => setOpen((value) => !value)}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id="mobile-navigation"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="navbar-mobile"
                    >
                        <div className="navbar-mobile-inner">
                            <p className="navbar-mobile-label">ÍNDICE DE ARCHIVOS</p>

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
                                            `navbar-mobile-link ${isActive ? "is-active" : ""}`
                                        }
                                    >
                                        <span>{link.label}</span>
                                        <ChevronRight size={16} />
                                    </NavLink>
                                </motion.div>
                            ))}

                            <Link
                                to="/personajes"
                                onClick={closeMenu}
                                className="navbar-mobile-explore"
                            >
                                Explorar personajes
                                <ChevronRight size={18} />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
