/**
 * Registro centralizzato delle icone FontAwesome usate nel sito.
 *
 * Con la nuova sintassi React di FontAwesome le icone non sono più
 * stringhe (es. "fa-solid fa-house") ma oggetti importati uno a uno dai
 * pacchetti @fortawesome/*-svg-icons e passati al componente
 * <FontAwesomeIcon icon={faHouse} />. Per evitare di ripetere gli import
 * in ogni componente, li raccogliamo tutti qui.
 *
 * Vedi: https://docs.fontawesome.com/web/use-with/react/add-icons
 * (sezione "Importing Specific Icons", l'opzione consigliata per il
 * tree-shaking quando si usano solo i pacchetti gratuiti).
 */
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleQuestion,
  faFilm,
  faMusic,
  faLandmark,
  faEarthAmericas,
  faFlask,
  faFutbol,
  faGamepad,
  faBookOpen,
  faBrain,
  faHashtag,
  faHeart,
  faPlay,
  faPenToSquare,
  faUpRightFromSquare,
  faArrowLeft,
  faArrowRight,
  faLayerGroup,
  faRotateLeft,
  faMagnifyingGlass,
  faBoxArchive,
  faFeatherPointed,
} from '@fortawesome/free-solid-svg-icons';

/** Icona del "sigillo" mostrato sopra la copertina e della pillola
 *  genere, in base al genere del quiz. Per generi non in lista viene
 *  usata l'icona generica (un punto interrogativo, a tema "quiz"). */
export const GENRE_ICONS: Record<string, IconDefinition> = {
  'Cultura generale': faBrain,
  Cinema: faFilm,
  Musica: faMusic,
  Storia: faLandmark,
  Geografia: faEarthAmericas,
  Scienza: faFlask,
  Sport: faFutbol,
  Videogiochi: faGamepad,
  Letteratura: faBookOpen,
};

export const DEFAULT_GENRE_ICON = faCircleQuestion;

/** Icone fisse, riusate in più componenti. */
export const ICONS = {
  quiz: faCircleQuestion,
  tag: faHashtag,
  heart: faHeart,
  play: faPlay,
  editor: faPenToSquare,
  externalLink: faUpRightFromSquare,
  arrowLeft: faArrowLeft,
  arrowRight: faArrowRight,
  filterAll: faLayerGroup,
  reset: faRotateLeft,
  search: faMagnifyingGlass,
  emptyArchive: faBoxArchive,
  notes: faFeatherPointed,
} as const;
