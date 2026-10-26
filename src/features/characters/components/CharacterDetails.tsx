import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, X } from "lucide-react";
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

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [character, onClose]);

  return (
    <AnimatePresence>
      {character && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-5"
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
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto border-t-[6px] border-[#bd4034] bg-[#1c202a] p-5 shadow-[0_0_0_4px_#08090d] sm:border-[4px] sm:border-t-[6px] sm:border-black sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e38a42]">
                  Archivo de personaje
                </p>
                <h2 id="character-detail-title" className="comic-heading mt-2 text-3xl sm:text-4xl">
                  {character.name}
                </h2>
                <p className="mt-2 text-xs text-[#b8b1a3]">{character.id}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar ficha"
                className="flex size-11 shrink-0 items-center justify-center border-2 border-[#f4e8cf] hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="border-2 border-black bg-[#252b37] p-4">
                <p className="text-xs uppercase tracking-wider text-[#b8b1a3]">Rol</p>
                <p className="mt-1 font-black">{character.role}</p>
              </div>
              <div className="border-2 border-black bg-[#252b37] p-4">
                <p className="text-xs uppercase tracking-wider text-[#b8b1a3]">Agresividad</p>
                <p className="mt-1 font-black">{character.aggressiveness}</p>
              </div>
              <div className="border-2 border-black bg-[#252b37] p-4">
                <p className="text-xs uppercase tracking-wider text-[#b8b1a3]">Salud</p>
                <p className="mt-1 flex items-center gap-2 font-black">
                  <Heart size={16} className="text-[#bd4034]" />
                  {character.hp ?? "Sin definir"}
                </p>
              </div>
              <div className="border-2 border-black bg-[#252b37] p-4">
                <p className="text-xs uppercase tracking-wider text-[#b8b1a3]">Aparición</p>
                <p className="mt-1 font-black">{character.appearance.join(", ")}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="border-b-2 border-[#bd4034] pb-2 text-sm font-black uppercase tracking-wider">
                Acciones
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {character.actions.map((action) => (
                  <span key={action} className="border-2 border-black bg-[#343b51] px-3 py-2 text-xs font-bold">
                    {action}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="border-b-2 border-[#e38a42] pb-2 text-sm font-black uppercase tracking-wider">
                Habilidades
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {character.abilities.map((ability) => (
                  <span key={ability} className="border-2 border-black bg-[#302a2b] px-3 py-2 text-xs font-bold text-[#f4e8cf]">
                    {ability}
                  </span>
                ))}
              </div>
            </div>

            {character.description && (
              <div className="mt-6">
                <h3 className="text-sm font-black uppercase tracking-wider">Descripción</h3>
                <p className="mt-2 text-sm leading-6 text-[#b8b1a3]">{character.description}</p>
              </div>
            )}

            <p className="mt-6 border-t border-white/10 pt-4 text-xs text-[#b8b1a3]">
              Los campos no definidos se completarán cuando exista información oficial del proyecto.
            </p>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
