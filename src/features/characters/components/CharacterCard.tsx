
import { ArrowUpRight, Heart, Shield, Swords } from "lucide-react";
import { motion } from "motion/react";
import type { Character } from "../types/character.types";

const roleColors: Record<string, string> = {
  Protagonista: "character-card__role--hero",
  NPC: "character-card__role--npc",
  Enemigo: "character-card__role--enemy",
  "Sub-jefe": "character-card__role--subboss",
  "Jefe final": "character-card__role--boss",
};

type Props = {
  character: Character;
  onSelect: (character: Character) => void;
};

export default function CharacterCard({ character, onSelect }: Props) {
  const initials = character.name
    .split(/[\s-]+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 3);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -7, rotateX: 1.5 }}
      transition={{
        layout: { duration: 0.25 },
        opacity: { duration: 0.3 },
        y: { type: "spring", stiffness: 300, damping: 22 },
        scale: { duration: 0.25 },
      }}
      className="character-card group flex h-full flex-col"
    >
      {/* Ilustración del personaje */}
      <div className="character-card__art pixel-texture">
        <div className="character-card__art-grid" aria-hidden="true" />
        <div className="character-card__art-glow" aria-hidden="true" />

        <span className="character-card__corner character-card__corner--tl" />
        <span className="character-card__corner character-card__corner--tr" />
        <span className="character-card__corner character-card__corner--bl" />
        <span className="character-card__corner character-card__corner--br" />

        <span className="character-card__role">
          <span className={`character-card__role-badge ${roleColors[character.role] ?? ""}`}>
            {character.role}
          </span>
        </span>

        <motion.div
          className="character-card__portrait"
          whileHover={{ scale: 1.08, y: -3 }}
          transition={{ type: "spring", stiffness: 260, damping: 15 }}
        >
          <span className="character-card__initials" aria-hidden="true">
            {initials}
          </span>
          <Swords
            className="character-card__portrait-icon"
            size={24}
            aria-hidden="true"
          />
        </motion.div>

        <span className="character-card__art-caption">
          <span className="character-card__signal" />
          REGISTRO DE PERSONAJE
        </span>
      </div>

      {/* Información */}
      <div className="character-card__body">
        <div className="character-card__title-row">
          <div className="min-w-0">
            <p className="character-card__eyebrow">ARCHIVO DE METRONIA</p>
            <h3 className="character-card__name">{character.name}</h3>
          </div>

          <span className="character-card__index" aria-hidden="true">
            <Shield size={20} />
          </span>
        </div>

        <div className="character-card__stats">
          <div className="character-card__stat">
            <Heart size={15} className="character-card__hp-icon" />
            <span className="character-card__stat-label">SALUD</span>
            <strong>{character.hp ?? "—"}</strong>
          </div>

          <div className="character-card__stat">
            <Shield size={15} className="character-card__defense-icon" />
            <span className="character-card__stat-label">ACTITUD</span>
            <strong className="character-card__aggression">
              {character.aggressiveness}
            </strong>
          </div>
        </div>

        <div className="character-card__appearance">
          <span className="character-card__appearance-label">
            APARICIÓN
          </span>
          <p>{character.appearance.join(" / ")}</p>
        </div>

        <button
          type="button"
          onClick={() => onSelect(character)}
          className="character-card__button"
          aria-label={`Ver ficha de ${character.name}`}
        >
          <span>CONSULTAR FICHA</span>
          <ArrowUpRight size={18} />
        </button>
      </div>
    </motion.article>
  );
}
