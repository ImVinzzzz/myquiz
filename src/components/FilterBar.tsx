import type { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICONS } from '../lib/icons';

interface FilterBarProps {
  /** Generi disponibili (derivati dai dati) */
  genres: string[];
  /** Tag disponibili (derivati dai dati) */
  tags: string[];
  /** Genere attualmente selezionato; null = "Tutti" */
  selectedGenre: string | null;
  /** Tag attualmente selezionati (selezione multipla, OR tra loro) */
  selectedTags: string[];
  onGenreChange: (genre: string | null) => void;
  onTagToggle: (tag: string) => void;
  onReset: () => void;
}

function chipClasses(active: boolean): string {
  return [
    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EA580C]",
    active
      ? "bg-[#F97316] text-[#1E130B]"
      : "bg-[#2D1B0F] text-[#FFE0B2] ring-1 ring-[#4E2D13] hover:text-[#FFF3E0] hover:ring-[#F97316]/50",
  ].join(" ");
}

/**
 * Barra dei filtri: genere (selezione singola) e tag (selezione multipla,
 * in OR tra loro). Componente puramente presentazionale: lo stato dei
 * filtri vive in `pages/Home.tsx`.
 */
export default function FilterBar({
  genres,
  tags,
  selectedGenre,
  selectedTags,
  onGenreChange,
  onTagToggle,
  onReset,
}: FilterBarProps): ReactElement {
  const hasActiveFilters = selectedGenre !== null || selectedTags.length > 0;

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-[#4E2D13] bg-[#1E130B] p-5">
      {/* Filtro per genere (selezione singola) */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B5E96]">
          Genere
        </span>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => onGenreChange(null)} className={chipClasses(selectedGenre === null)} aria-pressed={selectedGenre === null}>
            <FontAwesomeIcon icon={ICONS.filterAll} className="text-[0.7rem]" aria-hidden="true" />
            Tutti
          </button>
          {genres.map((genre) => (
            <button key={genre} type="button" onClick={() => onGenreChange(genre)} className={chipClasses(selectedGenre === genre)} aria-pressed={selectedGenre === genre}>
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Filtro per tag (selezione multipla) */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B5E96]">
          Tag
        </span>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button key={tag} type="button" onClick={() => onTagToggle(tag)} className={chipClasses(selectedTags.includes(tag))} aria-pressed={selectedTags.includes(tag)}>
              <FontAwesomeIcon icon={ICONS.tag} className="text-[0.65rem]" aria-hidden="true" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#F97316] hover:text-[#FF8C00]"
        >
          <FontAwesomeIcon icon={ICONS.reset} className="text-[0.7rem]" aria-hidden="true" />
          Azzera filtri
        </button>
      )}
    </div>
  );
}
