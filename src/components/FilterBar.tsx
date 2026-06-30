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
  showOnlyFavorites: boolean;
  onGenreChange: (genre: string | null) => void;
  onTagToggle: (tag: string) => void;
  onFavoritesChange: (showOnly: boolean) => void;
  onReset: () => void;
}

function chipClasses(active: boolean): string {
  return [
    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0C1B]",
    active
      ? "bg-[#A78BFA] text-[#0F0C1B]"
      : "bg-[#251D3A] text-[#A5B4FC] ring-1 ring-[#312A53] hover:text-[#F1F5F9] hover:ring-[#A78BFA]/50",
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
  showOnlyFavorites,
  onGenreChange,
  onTagToggle,
  onFavoritesChange,
  onReset,
}: FilterBarProps): ReactElement {
  const hasActiveFilters = selectedGenre !== null || selectedTags.length > 0 || showOnlyFavorites;

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-[#312A53] bg-[#19152E] p-5">
      {/* Filtro per genere (selezione singola) e Preferiti */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A78BFA]">
          Genere
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {/* Pulsante Toggle Preferiti */}
          <button
            type="button"
            onClick={() => onFavoritesChange(!showOnlyFavorites)}
            className={chipClasses(showOnlyFavorites)}
            aria-pressed={showOnlyFavorites}
          >
            <FontAwesomeIcon icon={ICONS.heart} className="text-[0.7rem]" aria-hidden="true" />
            Preferiti
          </button>

          {/* Divisore */}
          <div className="h-5 w-px bg-[#312A53]" aria-hidden="true" />

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
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A78BFA]">
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
          className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#A78BFA] hover:text-[#C4B5FD]"
        >
          <FontAwesomeIcon icon={ICONS.reset} className="text-[0.7rem]" aria-hidden="true" />
          Azzera filtri
        </button>
      )}
    </div>
  );
}
