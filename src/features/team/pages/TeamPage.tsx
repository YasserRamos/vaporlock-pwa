
import { useEffect, useMemo, useState } from "react";
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
  Wrench,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import type { CSSProperties, ComponentType } from "react";
import { Link } from "react-router-dom";
import "../css/team.css";

const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

interface MiembroEquipoApi {
  pkMiembroEquipo: number;
  fkMediaPortada: number | null;
  nombre: string;
  rol: string;
  biografia: string | null;
  enlace: string | null;
  orden: number;
}

interface TeamRole {
  title: string;
  color: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  members: MiembroEquipoApi[];
}

type RequestState = "loading" | "success" | "error" | "empty" | "invalid";

function isMiembroEquipo(value: unknown): value is MiembroEquipoApi {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const member = value as Record<string, unknown>;

  return (
    typeof member.pkMiembroEquipo === "number" &&
    (typeof member.fkMediaPortada === "number" ||
      member.fkMediaPortada === null) &&
    typeof member.nombre === "string" &&
    typeof member.rol === "string" &&
    (typeof member.biografia === "string" ||
      member.biografia === null) &&
    (typeof member.enlace === "string" || member.enlace === null) &&
    typeof member.orden === "number"
  );
}

function getRolePresentation(rol: string) {
  const normalizedRole = rol.toLowerCase();

  if (
    normalizedRole.includes("diseño") ||
    normalizedRole.includes("arte")
  ) {
    return {
      icon: Palette,
      color: "#e99545",
    };
  }

  if (
    normalizedRole.includes("program") ||
    normalizedRole.includes("desarroll")
  ) {
    return {
      icon: Code2,
      color: "#39d5cb",
    };
  }

  if (normalizedRole.includes("anim")) {
    return {
      icon: Clapperboard,
      color: "#39d5cb",
    };
  }

  if (
    normalizedRole.includes("audio") ||
    normalizedRole.includes("sonido") ||
    normalizedRole.includes("música")
  ) {
    return {
      icon: Music2,
      color: "#e99545",
    };
  }

  if (
    normalizedRole.includes("narrativa") ||
    normalizedRole.includes("escritura")
  ) {
    return {
      icon: BookOpen,
      color: "#39d5cb",
    };
  }

  if (
    normalizedRole.includes("qa") ||
    normalizedRole.includes("calidad") ||
    normalizedRole.includes("prueba")
  ) {
    return {
      icon: Bug,
      color: "#e99545",
    };
  }

  if (
    normalizedRole.includes("gestión") ||
    normalizedRole.includes("gestion") ||
    normalizedRole.includes("coordinación") ||
    normalizedRole.includes("coordinacion")
  ) {
    return {
      icon: ClipboardList,
      color: "#39d5cb",
    };
  }

  return {
    icon: Wrench,
    color: "#e99545",
  };
}

function getExternalLink(value: string | null): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.href;
    }

    return null;
  } catch {
    return null;
  }
}

export default function TeamPage() {
  const [members, setMembers] = useState<MiembroEquipoApi[]>([]);
  const [status, setStatus] = useState<RequestState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMembers = async () => {
      if (!API_URL) {
        setMembers([]);
        setStatus("error");
        setErrorMessage(
          "No se ha configurado la dirección de la API. Revisa VITE_API_URL."
        );
        return;
      }

      setStatus("loading");
      setErrorMessage("");

      try {
        const response = await fetch(`${API_URL}/miembros-equipo`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `El servidor respondió con el código ${response.status}.`
          );
        }

        const data: unknown = await response.json();

        if (
          !Array.isArray(data) ||
          !data.every(isMiembroEquipo)
        ) {
          setMembers([]);
          setStatus("invalid");
          return;
        }

        setMembers(data);

        setStatus(data.length > 0 ? "success" : "empty");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setMembers([]);
        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "No se pudo establecer conexión con el servidor."
        );
      }
    };

    void fetchMembers();

    return () => controller.abort();
  }, [retry]);

  const roles = useMemo<TeamRole[]>(() => {
    const grouped = new Map<string, MiembroEquipoApi[]>();

    members.forEach((member) => {
      const role = member.rol.trim() || "Sin rol asignado";
      const existing = grouped.get(role);

      if (existing) {
        existing.push(member);
      } else {
        grouped.set(role, [member]);
      }
    });

    return Array.from(grouped.entries()).map(([title, roleMembers]) => {
      const presentation = getRolePresentation(title);

      return {
        title,
        color: presentation.color,
        icon: presentation.icon,
        members: roleMembers,
      };
    });
  }, [members]);

  const handleRetry = () => {
    setRetry((current) => current + 1);
  };

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
              <span>INTEGRANTES</span>
              <strong>
                {status === "success" ? String(members.length).padStart(2, "0") : "--"}
              </strong>
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
              <h2>INTEGRANTES Y ROLES</h2>
            </div>

            <span className="team-total">
              {status === "success"
                ? `${String(roles.length).padStart(2, "0")} ROLES`
                : "-- ROLES"}
            </span>
          </div>

          {status === "loading" && (
            <div className="team-feedback" role="status">
              <RefreshCw size={26} className="team-loading-icon" />
              <h3>CONSULTANDO ARCHIVO DEL PERSONAL...</h3>
              <p>Conectando con los registros de Metronia.</p>
            </div>
          )}

          {status === "error" && (
            <div className="team-feedback team-feedback-error" role="alert">
              <RefreshCw size={27} />
              <div>
                <h3>NO SE PUDO CARGAR EL EQUIPO.</h3>
                <p>{errorMessage}</p>
                <button
                  type="button"
                  className="team-retry"
                  onClick={handleRetry}
                >
                  <RefreshCw size={15} />
                  REINTENTAR
                </button>
              </div>
            </div>
          )}

          {status === "invalid" && (
            <div className="team-feedback team-feedback-error" role="alert">
              <h3>FORMATO DE DATOS NO VÁLIDO.</h3>
              <p>
                La respuesta del servidor no coincide con la estructura
                esperada para los integrantes del equipo.
              </p>
              <button
                type="button"
                className="team-retry"
                onClick={handleRetry}
              >
                <RefreshCw size={15} />
                REINTENTAR
              </button>
            </div>
          )}

          {status === "empty" && (
            <div className="team-feedback">
              <Users size={28} />
              <h3>NO HAY INTEGRANTES PUBLICADOS.</h3>
              <p>El directorio todavía no contiene registros disponibles.</p>
            </div>
          )}

          {status === "success" && (
            <div className="team-department-grid">
              {roles.map((role, index) => {
                const Icon = role.icon;

                return (
                  <motion.article
                    key={role.title}
                    className="team-department"
                    style={
                      { "--department-color": role.color } as CSSProperties
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
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="team-department-title">
                        <span>ROL DEL PROYECTO</span>
                        <h3>{role.title}</h3>
                      </div>

                      <div className="team-department-icon">
                        <Icon size={23} strokeWidth={1.8} />
                      </div>
                    </div>

                    <div className="team-department-content">
                      <div className="team-members">
                        <h4>INTEGRANTES</h4>
                        <ul>
                          {role.members.map((member) => (
                            <li key={member.pkMiembroEquipo}>
                              <div className="team-member-entry">
                                {member.fkMediaPortada !== null && (
                                  <img
                                    className="team-member-avatar"
                                    src={`${API_URL}/media/${member.fkMediaPortada}`}
                                    alt={
                                      member.nombre
                                        ? `Fotografía de ${member.nombre}`
                                        : ""
                                    }
                                    loading="lazy"
                                  />
                                )}

                                <div className="team-member-information">
                                  <strong>{member.nombre}</strong>

                                  {member.biografia && (
                                    <p>{member.biografia}</p>
                                  )}

                                  {getExternalLink(member.enlace) && (
                                    <a
                                      href={getExternalLink(member.enlace)!}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="team-member-link"
                                    >
                                      VER ENLACE
                                      <ExternalLink size={13} />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="team-department-footer">
                      <span className="team-status-indicator" />
                      ÁREA REGISTRADA
                      <span className="team-footer-code">
                        VL_{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
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
