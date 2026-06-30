import type { Quiz } from '../types';

/**
 * Archivio dei quiz online.
 *
 * Per aggiungere un nuovo quiz basta inserire un nuovo oggetto in questo
 * array: nessun componente o pagina deve essere modificato. Puoi generare
 * il codice da incollare qui con `tools/quiz-generator.html`.
 */
export const quizzes: Quiz[] = [
  {
    id: 'capitali-del-mondo-express',
    slug: 'capitali-del-mondo-express',
    title: 'Capitali del Mondo Express',
    subtitle: 'Quante capitali riconosci in meno di 60 secondi?',
    coverImageUrl: '/images/capitali-del-mondo-express.jpg',
    genre: 'Geografia',
    tags: ['capitali', 'velocità', 'mappamondo'],
    description:
      "Una serie rapida di domande a risposta multipla sulle capitali di tutto il mondo, dalle più note alle più insidiose. Pensato per partite veloci, con un timer stretto che premia chi ha la mappa in testa.",
    notes: 'Versione "facile" disponibile nell\'editor: utile per le serate con bambini o principianti.',
    favorite: true,
    gameUrl: '#',
    editorUrl: '#',
  },
  {
    id: 'cinema-italiano-anni-60-70',
    slug: 'cinema-italiano-anni-60-70',
    title: "Cinema Italiano, Anni '60-'70",
    subtitle: 'Dalla commedia all\'italiana al cinema d\'autore',
    coverImageUrl: '/images/cinema-italiano-anni-60-70.jpg',
    genre: 'Cinema',
    tags: ['cinema italiano', 'storia del cinema'],
    description:
      "Un quiz a tema sul cinema italiano di due decadi d'oro: registi, attori, titoli iconici e curiosità di produzione. Difficoltà medio-alta, pensato per cinefili più che per il grande pubblico.",
    favorite: false,
    gameUrl: '#',
  },
];
