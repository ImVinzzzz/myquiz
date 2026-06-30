/**
 * Tipi e interfacce dell'archivio quiz online.
 *
 * Nota: a differenza degli altri archivi della stessa famiglia (avventure,
 * board game, libri), qui non esiste una collezione "autore" separata: il
 * quiz è l'unica entità del modello dati.
 */

/** Generi suggeriti: il campo `genre` resta una stringa libera (non un
 *  enum), così l'elenco è estensibile. Questo array serve solo come
 *  riferimento/suggerimento, anche nel generatore di codice. */
export const QUIZ_GENRE_SUGGESTIONS = [
  'Cultura generale',
  'Cinema',
  'Musica',
  'Storia',
  'Geografia',
  'Scienza',
  'Sport',
  'Videogiochi',
  'Letteratura',
] as const;

/** Rappresenta un singolo quiz online dell'archivio. */
export interface Quiz {
  /** Identificatore univoco */
  id: string;
  /** Slug usato nell'URL della scheda di dettaglio */
  slug: string;
  /** Titolo del quiz */
  title: string;
  /** Sottotitolo (opzionale) */
  subtitle?: string;
  /** Url dell'immagine di copertina, del tipo "/images/slug.jpg"
   *  (opzionale: se assente viene mostrato un segnaposto) */
  coverImageUrl?: string;
  /** Genere: campo libero ma con suggerimenti, vedi QUIZ_GENRE_SUGGESTIONS */
  genre: string;
  /** Tag/parole chiave libere, es. ["geografia", "capitali", "veloce"] */
  tags: string[];
  /** Descrizione del quiz */
  description: string;
  /** Note libere mostrate in un box dedicato (opzionale) */
  notes?: string;
  /** Se true, mostra il cuoricino "Preferito" in home e nella scheda */
  favorite?: boolean;
  /** Link al quiz giocabile online */
  gameUrl: string;
  /** Link all'editor del quiz, es. Kahoot/Quizizz creator (opzionale) */
  editorUrl?: string;
  /** Indica se il quiz è in arrivo (coming soon) */
  comingSoon?: boolean;
}
