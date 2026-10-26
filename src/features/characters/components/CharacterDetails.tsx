
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Heart,
  X,
  Shield,
  Zap,
  Crosshair,
  Activity,
  Cog,
  ArrowUpRight,
} from "lucide-react";
import type { Character } from "../types/character.types";

type Props = {
  character: Character | null;
  onClose: () => void;
};

export default function CharacterDetails({ character, onClose }: Props) {
  useEffect(() => {
    if (!character) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [character, onClose]);

  return (
    <AnimatePresence>
      {character && (
        <motion.div
          className="character-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="character-detail-title"
            className="character-modal__panel"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            {/* CABECERA */}
            <header className="character-modal__header">
              <div className="character-modal__heading">
                <div className="character-modal__eyebrow">
                  <span className="character-modal__signal" />
                  ARCHIVO DE METRONIA
                </div>

                <h2 id="character-detail-title">
                  {character.name}
                </h2>

                <p>
                  REGISTRO DE PERSONAJE
                  <span> / </span>
                  {character.role.toUpperCase()}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar ficha"
                className="character-modal__close"
              >
                <X size={23} />
              </button>
            </header>

            {/* PANEL DE INFORMACIÓN */}
            <div className="character-modal__content">
              <motion.div
                className="character-modal__identity"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 }}
              >
                <div className="character-modal__emblem">
                  <div className="character-modal__emblem-grid" />
                  <Cog
                    className="character-modal__gear"
                    size={106}
                    strokeWidth={1}
                  />
                  <Shield
                    className="character-modal__shield"
                    size={62}
                    strokeWidth={1.5}
                  />
                  <Zap
                    className="character-modal__zap"
                    size={24}
                    fill="currentColor"
                  />
                </div>

                <div className="character-modal__identity-copy">
                  <span className="character-modal__section-label">
                    PERFIL
                  </span>
                  <h3>{character.name}</h3>
                  <span className="character-modal__role">
                    {character.role}
                  </span>

                  <p>
                    {character.description ||
                      "La información adicional de este personaje se incorporará cuando esté definida."}
                  </p>
                </div>
              </motion.div>

              {/* ATRIBUTOS */}
              <div className="character-modal__section">
                <div className="character-modal__section-title">
                  <Activity size={17} />
                  <h3>ATRIBUTOS</h3>
                  <span />
                </div>

                <div className="character-modal__stats">
                  <motion.div
                    className="character-modal__stat character-modal__stat--health"
                    whileHover={{ y: -3 }}
                  >
                    <Heart size={21} />
                    <span>SALUD</span>
                    <strong>{character.hp ?? "Sin definir"}</strong>
                  </motion.div>

                  <motion.div
                    className="character-modal__stat character-modal__stat--defense"
                    whileHover={{ y: -3 }}
                  >
                    <Shield size={21} />
                    <span>ACTITUD</span>
                    <strong>{character.aggressiveness}</strong>
                  </motion.div>

                  <motion.div
                    className="character-modal__stat character-modal__stat--role"
                    whileHover={{ y: -3 }}
                  >
                    <Crosshair size={21} />
                    <span>ROL</span>
                    <strong>{character.role}</strong>
                  </motion.div>
                </div>
              </div>

              {/* APARICIONES */}
              <div className="character-modal__section">
                <div className="character-modal__section-title">
                  <ArrowUpRight size={17} />
                  <h3>APARICIONES</h3>
                  <span />
                </div>

                <div className="character-modal__tags">
                  {character.appearance.map((appearance) => (
                    <motion.span
                      key={appearance}
                      className="character-modal__tag"
                      whileHover={{ y: -2 }}
                    >
                      {appearance}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* ACCIONES */}
              <div className="character-modal__section">
                <div className="character-modal__section-title">
                  <Crosshair size={17} />
                  <h3>ACCIONES</h3>
                  <span />
                </div>

                <div className="character-modal__tags">
                  {character.actions.length > 0 ? (
                    character.actions.map((action) => (
                      <motion.span
                        key={action}
                        className="character-modal__tag character-modal__tag--action"
                        whileHover={{ y: -2 }}
                      >
                        {action}
                      </motion.span>
                    ))
                  ) : (
                    <p className="character-modal__empty">
                      Acciones pendientes de definir.
                    </p>
                  )}
                </div>
              </div>

              {/* HABILIDADES */}
              <div className="character-modal__section">
                <div className="character-modal__section-title">
                  <Zap size={17} />
                  <h3>HABILIDADES</h3>
                  <span />
                </div>

                <div className="character-modal__tags">
                  {character.abilities.length > 0 ? (
                    character.abilities.map((ability) => (
                      <motion.span
                        key={ability}
                        className="character-modal__tag character-modal__tag--ability"
                        whileHover={{ y: -2 }}
                      >
                        <Zap size={13} />
                        {ability}
                      </motion.span>
                    ))
                  ) : (
                    <p className="character-modal__empty">
                      Habilidades pendientes de definir.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* PIE */}
            <footer className="character-modal__footer">
              <span>
                <span className="character-modal__signal" />
                SISTEMA DE ARCHIVOS ACTIVO
              </span>
              <button type="button" onClick={onClose}>
                CERRAR ARCHIVO <X size={15} />
              </button>
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
