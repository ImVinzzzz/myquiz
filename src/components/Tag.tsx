import type { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { GENRE_ICONS, DEFAULT_GENRE_ICON, ICONS } from '../lib/icons';

export type TagVariant = 'genre' | 'tag';

interface TagProps {
  label: string;
  variant?: TagVariant;
  /** Icona FontAwesome opzionale (oggetto, non più stringa): se omessa
   *  viene scelta in automatico in base alla variante. */
  icon?: IconDefinition;
}

/**
 * Etichetta a "pillola" usata per mostrare il genere (variante "genre",
 * accento viola) o un tag libero (variante "tag", accento ciano).
 */
export default function Tag({ label, variant = 'tag', icon }: TagProps): ReactElement {
  const resolvedIcon = icon ?? (variant === 'genre' ? GENRE_ICONS[label] ?? DEFAULT_GENRE_ICON : ICONS.tag);

  const baseClasses =
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide';

  const variantClasses =
    variant === 'genre'
      ? 'bg-[#A855F7]/15 text-[#C084FC] ring-1 ring-[#A855F7]/40'
      : 'bg-[#22D3EE]/10 text-[#67E8F9] ring-1 ring-[#22D3EE]/30';

  return (
    <span className={`${baseClasses} ${variantClasses}`}>
      <FontAwesomeIcon icon={resolvedIcon} className="text-[0.65rem]" aria-hidden="true" />
      {label}
    </span>
  );
}
