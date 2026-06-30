import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Quiz } from '../types';
import Tag from './Tag';
import { GENRE_ICONS, DEFAULT_GENRE_ICON, ICONS } from '../lib/icons';

interface QuizCardProps {
  quiz: Quiz;
}

/**
 * Card mostrata nella griglia della home. Riporta a `/quiz/:slug`.
 * Richiede `react-router-dom` con una route configurata su quel path
 * (vedi il commento in fondo a `pages/QuizDetail.tsx`).
 */
export default function QuizCard({ quiz }: QuizCardProps): ReactElement {
  const sealIcon = GENRE_ICONS[quiz.genre] ?? DEFAULT_GENRE_ICON;
  const visibleTags = quiz.tags.slice(0, 2);
  const extraTagsCount = quiz.tags.length - visibleTags.length;

  return (
    <Link
      to={"/quiz/" + quiz.slug}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#2D1B0F] ring-1 ring-[#4E2D13] transition-all duration-200 hover:-translate-y-1 hover:ring-[#F97316]/50 hover:shadow-xl hover:shadow-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
    >
      {/* Copertina (o segnaposto se assente) */}
      <div className="relative h-44 w-full overflow-hidden sm:h-48">
        {quiz.coverImageUrl ? (
          <img
            src={quiz.coverImageUrl}
            alt={`Copertina di ${quiz.title}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#23150C] text-[#5C3E2A]">
            <FontAwesomeIcon icon={ICONS.quiz} className="text-4xl" aria-hidden="true" />
            <span className="font-display text-xs text-[#8F705B]">Copertina non disponibile</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#EA580C] via-[#EA580C]/10 to-transparent" />

        {quiz.favorite && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#FF2E93]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
            <FontAwesomeIcon icon={ICONS.heart} className="text-[0.65rem]" aria-hidden="true" />
            Preferito
          </span>
        )}

        {/* Sigillo con l'icona del genere */}
        <div className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#EA580C]/80 text-[#FFB74D] shadow-md ring-2 ring-[#F97316]/70 backdrop-blur-sm">
          <FontAwesomeIcon icon={sealIcon} className="text-base" aria-hidden="true" />
        </div>
      </div>

      {/* Contenuto testuale */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-bold leading-snug text-[#F1EAFE] group-hover:text-white">
            {quiz.title}
          </h3>
          {quiz.subtitle && <p className="mt-1 text-sm italic text-[#B4A8D4]">{quiz.subtitle}</p>}
        </div>

        {/* line-clamp è incluso di default da Tailwind v3.3+; su versioni
            precedenti serve il plugin @tailwindcss/line-clamp */}
        <p className="line-clamp-3 text-sm leading-relaxed text-[#D8CFEF]">{quiz.description}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <Tag label={quiz.genre} variant="genre" />
          {visibleTags.map((tag) => (
            <Tag key={tag} label={tag} variant="tag" />
          ))}
          {extraTagsCount > 0 && (
            <span className="text-xs font-medium text-[#6B5E96]">+{extraTagsCount}</span>
          )}
        </div>

        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F97316] transition-transform group-hover:translate-x-0.5">
          Apri la scheda
          <FontAwesomeIcon icon={ICONS.arrowRight} className="text-xs" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
