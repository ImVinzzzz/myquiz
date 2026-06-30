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
    id: "triviatrek",
    slug: "triviatrek",
    title: "TriviaTrek",
    subtitle: "Completa la missione",
    coverImageUrl: "/images/triviatrek.jpg",
    genre: "Quiz",
    tags: ["Star Trek", "USS Afrodite", "quiz"],
    description: "Trivia Trek è un gioco a quiz interattivo a tema Star Trek, appositamente personalizzato per la ciurma degli \"Afrodisiaci\" a bordo della mitica USS Afrodite.\n\nIl gioco si presenta con una splendida interfaccia in stile LCARS (l'iconico sistema operativo dei computer della Flotta Stellare), completa di effetti sonori e una colonna sonora orchestrale in sottofondo. I giocatori si sfidano a turni rispondendo a domande divise in categorie su un tabellone di gioco, accumulando punti (o assegnandone agli avversari in caso di risposte errata), fino a decretare il vincitore finale.",
    favorite: true,
    gameUrl: "https://triviatrek.vercel.app/",
    editorUrl: "https://triviatrek.vercel.app/editor.html",
  },
  {
  id: "idioti-crossquiz",
  slug: "idioti-crossquiz",
  title: "Idioti crossquiz",
  coverImageUrl: "/images/idioti-crossquiz.jpg",
  genre: "Cruciverba",
  tags: ["cultura generale", "parole", "quiz", "cruciverba"],
  description: "Un gioco da tavolo digitale per 2–6 giocatori (o squadre) basato su un cruciverba a tema variabile e cultura generale.",
  favorite: false,
  gameUrl: "https://idioti-crossquiz.vercel.app/",
  },
  {
    id: "gira-la-ruota",
    slug: "gira-la-ruota",
    title: "Gira la Ruota",
    subtitle: "Perché ogni lettera conta",
    coverImageUrl: "/images/gira-la-ruota.jpg",
    genre: "Quiz",
    tags: ["cultura generale", "parole", "fortuna", "quiz"],
    description: "Gira la Ruota è un gioco a turni in cui da 2 a 6 giocatori si sfidano per indovinare una frase nascosta sul tabellone, accumulando punti e scalando la classifica della manche.\n\nRegole e Meccanica di Gioco\nOgni partita si sviluppa su più manche (mediamente 5), ognuna con un argomento specifico. A ogni turno, il giocatore attivo può scegliere tra tre azioni: Girare la Ruota; Acquistare un Vocale; Dare la Soluzione).\n\nVittoria:\nAl termine di tutte le manche, il giocatore con il punteggio totale più alto viene proclamato vincitore della partita.",
    favorite: true,
    gameUrl: "https://giralaruota.vercel.app/",
  },
  {
    id: "megaquiz",
    slug: "megaquiz",
    title: "MegaQUIZ!",
    coverImageUrl: "/images/megaquiz.jpg",
    genre: "Quiz",
    tags: ["cultura generale", "quiz"],
    description: "MegaQUIZ! è un'applicazione web interattiva per la gestione e la riproduzione di un gioco a quiz multiplayer (singoli o a squadre), ispirato al celebre formato \"Jeopardy!\". Il gioco è strutturato su più livelli e presenta un tabellone con categorie e domande a punteggio incrementale, arricchite da supporti multimediali (immagini e tracce audio).",
    notes: "Il progetto include anche un editor integrato che consente di personalizzare facilmente domande, categorie e livelli.",
    favorite: false,
    gameUrl: "https://megaquiz2.vercel.app/",
    editorUrl: "https://megaquiz2.vercel.app/editor.html",
  },
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
