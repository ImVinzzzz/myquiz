import { useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { quizzes } from '../data/quizzes';
import QuizCard from '../components/QuizCard';
import FilterBar from '../components/FilterBar';
import { ICONS } from '../lib/icons';

/**
 * Pagina principale: intestazione dell'archivio + filtri + griglia
 * responsive dei quiz. I dati arrivano da `data/quizzes.ts`, quindi
 * aggiungere un nuovo quiz non richiede modifiche a questo file (generi
 * e tag per i filtri si aggiornano da soli).
 */
export default function Home(): ReactElement {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  // Generi e tag derivati dai dati: nessuna lista da mantenere
  // manualmente quando aggiungi un nuovo quiz.
  const genres = useMemo(() => Array.from(new Set(quizzes.map((quiz) => quiz.genre))).sort(), []);
  const tags = useMemo(() => Array.from(new Set(quizzes.flatMap((quiz) => quiz.tags))).sort(), []);

  const filteredQuizzes = useMemo(() => {
    return quizzes
      .filter((quiz) => {
        const matchesGenre = selectedGenre === null || quiz.genre === selectedGenre;
        // I tag selezionati sono in OR tra loro: basta che il quiz abbia
        // almeno uno dei tag spuntati per comparire nei risultati.
        const matchesTags =
          selectedTags.length === 0 || selectedTags.some((tag) => quiz.tags.includes(tag));
        const matchesSearch =
          searchQuery.trim() === "" ||
          quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFavorites = !showOnlyFavorites || quiz.favorite === true;
        return matchesGenre && matchesTags && matchesSearch && matchesFavorites;
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [selectedGenre, selectedTags, searchQuery, showOnlyFavorites]);

  function toggleTag(tag: string): void {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]));
  }

  function resetFilters(): void {
    setSelectedGenre(null);
    setSelectedTags([]);
    setSearchQuery("");
    setShowOnlyFavorites(false);
  }

  return (
    <div className="min-h-screen bg-[#0F0C1B] text-[#F1F5F9]">
      {/* Intestazione */}
      <header className="border-b border-[#312A53] bg-[#19152E]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 sm:py-14">
          <div className="flex items-center gap-3 text-[#A78BFA]">
            <FontAwesomeIcon icon={ICONS.quiz} className="text-2xl" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              La mia raccolta di quiz
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl text-[#F1F5F9]">I Miei Quiz</h1>
          <p className="max-w-2xl text-sm text-[#A5B4FC] sm:text-base">
            Tutti i quiz online che ho creato, pronti da giocare e, dove disponibile, da
            modificare direttamente nell&apos;editor originale.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        {/* Filtri e Ricerca: mostrati solo se c'è almeno un quiz in archivio */}
        {quizzes.length > 0 && (
          <div className="mb-8 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 items-center">
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#19152E] px-5 py-2.5 text-sm font-semibold text-[#F1F5F9] border border-[#312A53] hover:bg-[#251D3A] hover:border-[#A78BFA]/50 transition"
                >
                  <FontAwesomeIcon icon={showFilters ? ICONS.anglesUp : ICONS.filterAll} aria-hidden="true" />
                  {showFilters ? "Nascondi filtri" : "Mostra filtri"}
                </button>
              </div>

              <div className="sm:col-span-1 lg:col-span-2 flex justify-end w-full">
                <div className="relative w-full max-w-md lg:max-w-none">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#94A3B8]">
                    <FontAwesomeIcon icon={ICONS.search} aria-hidden="true" />
                  </span>
                  <input
                    type="text"
                    placeholder="Trova per Titolo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-[#312A53] bg-[#19152E] py-2.5 pl-10 pr-4 text-sm text-[#F1F5F9] placeholder-[#94A3B8] focus:border-[#A78BFA] focus:outline-none focus:ring-1 focus:ring-[#A78BFA] transition-colors"
                  />
                </div>
              </div>
            </div>

            {showFilters && (
              <FilterBar
                genres={genres}
                tags={tags}
                selectedGenre={selectedGenre}
                selectedTags={selectedTags}
                showOnlyFavorites={showOnlyFavorites}
                onGenreChange={setSelectedGenre}
                onTagToggle={toggleTag}
                onFavoritesChange={setShowOnlyFavorites}
                onReset={resetFilters}
              />
            )}
          </div>
        )}

        {/* Griglia quiz */}
        {quizzes.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-[#312A53] py-16 text-center text-[#94A3B8]">
            <FontAwesomeIcon icon={ICONS.emptyArchive} className="text-3xl" aria-hidden="true" />
            <p>
              L&apos;archivio è vuoto per ora. Aggiungi un nuovo quiz in{' '}
              <code className="rounded bg-[#251D3A] px-1.5 py-0.5 text-[#A78BFA]">
                data/quizzes.ts
              </code>
              .
            </p>
          </div>
        ) : filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-[#312A53] py-16 text-center text-[#94A3B8]">
            <FontAwesomeIcon icon={ICONS.search} className="text-3xl" aria-hidden="true" />
            <p>Nessun quiz corrisponde ai filtri selezionati.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#A78BFA] hover:text-[#C4B5FD]"
            >
              <FontAwesomeIcon icon={ICONS.reset} className="text-xs" aria-hidden="true" />
              Azzera filtri
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
