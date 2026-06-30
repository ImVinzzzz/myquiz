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
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#EA580C] px-6 text-center text-[#FFF3E0]">
        <FontAwesomeIcon icon={ICONS.quiz} className="text-4xl text-[#F97316]" aria-hidden="true" />
        <h1 className="font-display text-2xl font-bold">Quiz non trovato</h1>
        <p className="text-[#FFE0B2]">Questo quiz non esiste, o non è ancora stato archiviato.</p>
        <Link
          to="/"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#F97316] px-5 py-2 text-sm font-semibold text-[#1E130B] transition hover:bg-[#FF8C00]"
        >
          <FontAwesomeIcon icon={ICONS.arrowLeft} aria-hidden="true" />
          Torna a I Miei Quiz
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EA580C] text-[#FFF3E0]">
      {/* Hero con immagine di copertina */}
      <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-96">
        {quiz.coverImageUrl ? (
          <img
            src={quiz.coverImageUrl}
            alt={"Copertina di " + quiz.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#2D1B0F] text-[#5C3E2A]">
            <FontAwesomeIcon icon={ICONS.quiz} className="text-5xl" aria-hidden="true" />
            <span className="font-display text-sm text-[#8F705B]">Copertina non disponibile</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#EA580C] via-[#EA580C]/70 to-transparent" />

        {quiz.favorite && (
          <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-[#FF2E93]/90 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
            <FontAwesomeIcon icon={ICONS.heart} className="text-xs" aria-hidden="true" />
            Preferito
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-8">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#FFE0B2] hover:text-[#FF8C00]"
          >
            <FontAwesomeIcon icon={ICONS.arrowLeft} aria-hidden="true" />
            Torna a I Miei Quiz
          </Link>
          <h1 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">{quiz.title}</h1>
          {quiz.subtitle && (
            <p className="mt-2 text-base italic text-[#FFE0B2] sm:text-lg">{quiz.subtitle}</p>
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
          <h2 className="font-display text-xl font-bold text-[#FFF3E0]">Descrizione</h2>
          <p className="mt-3 leading-relaxed text-[#FFE0B2]">{quiz.description}</p>
        </section>

        {/* Note: box facoltativo, mostrato solo se c'è qualcosa da segnalare */}
        {quiz.notes && (
          <section className="mt-8 max-w-3xl rounded-xl border border-dashed border-[#F97316]/40 bg-[#2D1B0F] p-5">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[#FFF3E0]">
              <FontAwesomeIcon icon={ICONS.notes} className="text-[#F97316]" aria-hidden="true" />
              Note
            </h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-[#FFE0B2]">{quiz.notes}</p>
          </section>
        )}

        {/* Azioni: Gioca ora (sempre presente) + Apri editor (opzionale) */}
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={quiz.gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#F97316] px-6 py-3 text-sm font-bold text-[#1E130B] transition hover:bg-[#FF8C00]"
          >
            <FontAwesomeIcon icon={ICONS.play} aria-hidden="true" />
            Gioca ora
          </a>

          {quiz.editorUrl && (
            <a
              href={quiz.editorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/40 px-6 py-3 text-sm font-semibold text-[#FF8C00] transition hover:border-[#F97316] hover:bg-[#F97316]/10"
            >
              <FontAwesomeIcon icon={ICONS.editor} aria-hidden="true" />
              Apri editor
              <FontAwesomeIcon icon={ICONS.externalLink} className="text-xs" aria-hidden="true" />
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
