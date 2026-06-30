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

  // Generi e tag derivati dai dati: nessuna lista da mantenere
  // manualmente quando aggiungi un nuovo quiz.
  const genres = useMemo(() => Array.from(new Set(quizzes.map((quiz) => quiz.genre))).sort(), []);
  const tags = useMemo(() => Array.from(new Set(quizzes.flatMap((quiz) => quiz.tags))).sort(), []);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesGenre = selectedGenre === null || quiz.genre === selectedGenre;
      // I tag selezionati sono in OR tra loro: basta che il quiz abbia
      // almeno uno dei tag spuntati per comparire nei risultati.
      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => quiz.tags.includes(tag));
      return matchesGenre && matchesTags;
    });
  }, [selectedGenre, selectedTags]);

  function toggleTag(tag: string): void {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]));
  }

  function resetFilters(): void {
    setSelectedGenre(null);
    setSelectedTags([]);
  }

  return (
    <div className="min-h-screen bg-[#EA580C] text-[#FFF3E0]">
      {/* Intestazione */}
      <header className="border-b border-[#4E2D13] bg-[#1E130B]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 sm:py-14">
          <div className="flex items-center gap-3 text-[#F97316]">
            <FontAwesomeIcon icon={ICONS.quiz} className="text-2xl" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              La mia raccolta di quiz
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">I Miei Quiz</h1>
          <p className="max-w-2xl text-sm text-[#FFE0B2] sm:text-base">
            Tutti i quiz online che ho creato, pronti da giocare e, dove disponibile, da
            modificare direttamente nell&apos;editor originale.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        {/* Filtri: mostrati solo se c'è almeno un quiz in archivio */}
        {quizzes.length > 0 && (
          <div className="mb-8">
            <FilterBar
              genres={genres}
              tags={tags}
              selectedGenre={selectedGenre}
              selectedTags={selectedTags}
              onGenreChange={setSelectedGenre}
              onTagToggle={toggleTag}
              onReset={resetFilters}
            />
          </div>
        )}

        {/* Griglia quiz */}
        {quizzes.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-[#4E2D13] py-16 text-center text-[#8F705B]">
            <FontAwesomeIcon icon={ICONS.emptyArchive} className="text-3xl" aria-hidden="true" />
            <p>
              L&apos;archivio è vuoto per ora. Aggiungi un nuovo quiz in{' '}
              <code className="rounded bg-[#2D1B0F] px-1.5 py-0.5 text-[#F97316]">
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
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-[#4E2D13] py-16 text-center text-[#8F705B]">
            <FontAwesomeIcon icon={ICONS.search} className="text-3xl" aria-hidden="true" />
            <p>Nessun quiz corrisponde ai filtri selezionati.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F97316] hover:text-[#FF8C00]"
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
