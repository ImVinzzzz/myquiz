import type { ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { quizzes } from '../data/quizzes';
import Tag from '../components/Tag';
import { ICONS } from '../lib/icons';

/**
 * Scheda di dettaglio di un singolo quiz.
 *
 * Richiede react-router-dom con una route del tipo:
 *   <Route path="/quiz/:slug" element={<QuizDetail />} />
 * (vedi anche il Link in `components/QuizCard.tsx`, che punta a questo path).
 */
export default function QuizDetail(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const quiz = quizzes.find((item) => item.slug === slug);

  if (!quiz) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0F0C1B] px-6 text-center text-[#F1F5F9]">
        <FontAwesomeIcon icon={ICONS.quiz} className="text-4xl text-[#A78BFA]" aria-hidden="true" />
        <h1 className="font-display text-2xl font-bold">Quiz non trovato</h1>
        <p className="text-[#A5B4FC]">Questo quiz non esiste, o non è ancora stato archiviato.</p>
        <Link
          to="/"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#A78BFA] px-5 py-2 text-sm font-semibold text-[#0F0C1B] transition hover:bg-[#C4B5FD]"
        >
          <FontAwesomeIcon icon={ICONS.arrowLeft} aria-hidden="true" />
          Torna a I Miei Quiz
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0C1B] text-[#F1F5F9]">
      {/* Hero con immagine di copertina */}
      <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-96">
        {quiz.coverImageUrl ? (
          <img
            src={quiz.coverImageUrl}
            alt={"Copertina di " + quiz.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#19152E] text-[#94A3B8]">
            <FontAwesomeIcon icon={ICONS.quiz} className="text-5xl" aria-hidden="true" />
            <span className="font-display text-sm text-[#94A3B8]">Copertina non disponibile</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C1B] via-[#0F0C1B]/70 to-transparent" />

        {quiz.favorite && (
          <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-[#FF2E93]/90 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
            <FontAwesomeIcon icon={ICONS.heart} className="text-xs" aria-hidden="true" />
            Preferito
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-8">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#A5B4FC] hover:text-[#C4B5FD]"
          >
            <FontAwesomeIcon icon={ICONS.arrowLeft} aria-hidden="true" />
            Torna a I Miei Quiz
          </Link>
          <h1 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl text-[#F1F5F9]">{quiz.title}</h1>
          {quiz.subtitle && (
            <p className="mt-2 text-base italic text-[#A5B4FC] sm:text-lg">{quiz.subtitle}</p>
          )}
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        {/* Tag */}
        <div className="flex flex-wrap items-center gap-2">
          <Tag label={quiz.genre} variant="genre" />
          {quiz.tags.map((tag) => (
            <Tag key={tag} label={tag} variant="tag" />
          ))}
        </div>

        {/* Descrizione */}
        <section className="mt-8 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-[#F1F5F9]">Descrizione</h2>
          <p className="mt-3 leading-relaxed text-[#A5B4FC]">{quiz.description}</p>
        </section>

        {/* Note: box facoltativo, mostrato solo se c'è qualcosa da segnalare */}
        {quiz.notes && (
          <section className="mt-8 max-w-3xl rounded-xl border border-dashed border-[#A78BFA]/40 bg-[#19152E] p-5">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[#F1F5F9]">
              <FontAwesomeIcon icon={ICONS.notes} className="text-[#A78BFA]" aria-hidden="true" />
              Note
            </h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-[#A5B4FC]">{quiz.notes}</p>
          </section>
        )}

        {/* Azioni: Gioca ora (sempre presente) + Apri editor (opzionale) */}
        <div className="mt-10 flex flex-wrap gap-3">
          {quiz.comingSoon ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-[#19152E] border border-[#312A53] px-6 py-3 text-sm font-semibold text-[#94A3B8]">
              <FontAwesomeIcon icon={ICONS.play} className="opacity-55" aria-hidden="true" />
              Prossimamente disponibile
            </span>
          ) : (
            <>
              <a
                href={quiz.gameUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#A78BFA] px-6 py-3 text-sm font-bold text-[#0F0C1B] transition hover:bg-[#C4B5FD]"
              >
                <FontAwesomeIcon icon={ICONS.play} aria-hidden="true" />
                Gioca ora
              </a>

              {quiz.editorUrl && (
                <a
                  href={quiz.editorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#A78BFA]/40 px-6 py-3 text-sm font-semibold text-[#A78BFA] transition hover:border-[#A78BFA] hover:bg-[#A78BFA]/10"
                >
                  <FontAwesomeIcon icon={ICONS.editor} aria-hidden="true" />
                  Apri editor
                  <FontAwesomeIcon icon={ICONS.externalLink} className="text-xs" aria-hidden="true" />
                </a>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
