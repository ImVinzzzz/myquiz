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
    tags: ["Star Trek", "USS Afrodite", "domande personalizzate", "quiz"],
    description: "Trivia Trek è un gioco a quiz interattivo a tema Star Trek, appositamente personalizzato per la ciurma degli \"Afrodisiaci\" a bordo della mitica USS Afrodite.\n\nIl gioco si presenta con una splendida interfaccia in stile LCARS (l'iconico sistema operativo dei computer della Flotta Stellare), completa di effetti sonori e una colonna sonora orchestrale in sottofondo. I giocatori si sfidano a turni rispondendo a domande divise in categorie su un tabellone di gioco, accumulando punti (o assegnandone agli avversari in caso di risposte errata), fino a decretare il vincitore finale.",
    favorite: true,
    gameUrl: "https://triviatrek.vercel.app/",
    editorUrl: "https://triviatrek.vercel.app/editor.html",
  },
  {
  id: "idioti-crossquiz",
  slug: "idioti-crossquiz",
  title: "Idioti crossQuiz",
  coverImageUrl: "/images/idioti-crossquiz.jpg",
  genre: "Cruciverba",
  tags: ["cultura generale", "parole", "quiz", "schemi personalizzati", "cruciverba"],
  description: "Un gioco per 2–6 giocatori (o squadre) basato su un cruciverba a tema variabile e domande di cultura generale.",
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
    tags: ["cultura generale", "parole", "domande personalizzate", "fortuna", "quiz"],
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
    tags: ["cultura generale", "domande personalizzate", "jeopardy", "quiz"],
    description: "MegaQUIZ! è un'applicazione web interattiva per la gestione e la riproduzione di un gioco a quiz multiplayer (singoli o a squadre), ispirato al celebre formato \"Jeopardy!\". Il gioco è strutturato su più livelli e presenta un tabellone con categorie e domande a punteggio incrementale, arricchite da supporti multimediali (immagini e tracce audio).",
    notes: "Il progetto include anche un editor integrato che consente di personalizzare facilmente domande, categorie e livelli.",
    favorite: false,
    gameUrl: "https://megaquiz2.vercel.app/",
    editorUrl: "https://megaquiz2.vercel.app/editor.html",
  },
  {
  id: "il-quiz",
  slug: "il-quiz",
  title: "il Quiz",
  coverImageUrl: "/images/ilquiz.jpg",
  genre: "Quiz",
  tags: ["cultura generale", "domande personalizzate", "domande a tempo", "ghigliottina", "quiz"],
  description: "Se vuoi cimentarti in questa sfida e mettere alla prova la tua cultura generale, ecco tutto quello che devi sapere sulle diverse manche che dovrai affrontare per raggiungere la vittoria finale. Il gioco si sviluppa in 6 manche consecutive, ciascuna con regole e dinamiche proprie. Il tuo obiettivo è accumulare il maggior numero possibile di punti prima di affrontare la leggendaria Ghigliottina. Le manche sono: 1. Correva l'Anno: il tuo compito è individuare l'anno esatto in cui è avvenuto l'evento descritto nella domanda. Ogni risposta corretta vale 5.000 punti; 2. La Scossa: sul tabellone compariranno 11 oggetti/soggetti che hanno tutti qualcosa in comune (indicata nella domanda). Il tuo obiettivo è spuntare quelli giusti evitando l'intruso. Ogni risposta corretta vale 2.000 punti; 3. Quante ne Sai?: Questa manche si divide in due round. In ciascun round ti verranno proposte 6 diverse doamnde con un valore di punteggio variabile; 4. Domande a Raffica: una corsa contro il tempo! Hai 180 secondi per rispondere a un massimo di 50 domande rapide. Ogni risposta corretta ti assegna 2.000 punti; 5. Vero o Falso?: Ancora una manche a tempo: hai 90 secondi per valutare 25 affermazioni e decidere se sono vere o false. Ogni risposta corretta vale 2.000 punti; 6. La Ghigliottina: È il momento della verità. Entri in finale con tutto il bottino accumulato nelle manche precedenti.",
  notes: "Riuscirai a mantenere intatto il tuo bottino e a indovinare la parola finale? Buona fortuna!",
  favorite: false,
  gameUrl: "https://il-quiz.vercel.app/",
  editorUrl: "https://il-quiz.vercel.app/editor.html",
},
  {
    id: 'capitali-del-mondo-express',
    slug: 'capitali-del-mondo-express',
    title: 'Capitali del Mondo - Express',
    subtitle: 'Quante capitali riconosci in meno di 60 secondi?',
    coverImageUrl: '/images/capitali-del-mondo-express.jpg',
    genre: 'Geografia',
    tags: ['capitali', 'velocità', 'mappamondo'],
    description:
      "Un gioco web a turni rapido e dinamico. Una serie di domande a risposta multipla sulle capitali di tutto il mondo, dalle più note alle più insidiose. Pensato per partite veloci, con un timer stretto che premia chi ha la mappa in testa. Il design e l'interfaccia si ispirano ai tabelloni delle partenze e degli arrivi (Split-Flap) degli aeroporti, regalando un'atmosfera da viaggio in tempo reale.",
    notes: 'Anche in versione "facile", utile per le serate con bambini o principianti.',
    favorite: false,
    gameUrl: 'https://capitali-express.vercel.app/',
    editorUrl: '#',
    comingSoon: true,
  },
];
