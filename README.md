# I Miei Quiz — Archivio Quiz Online

Sito personale per archiviare la mia raccolta di quiz online: descrizione, genere, tag e link diretti per giocare o, dove disponibile, modificare ogni quiz nel suo editor originale.

Fa parte della stessa famiglia di archivi personali di `archivio-avventure`, `archivio-boardgame` e `archivio-libri`, con stack e convenzioni identiche, ma con un modello dati più semplice (un solo tipo di scheda, niente collezioni collegate) e un cambiamento tecnico importante: le icone FontAwesome non passano più da un link CDN, ma da componenti React veri e propri.

## Stack tecnologico

- **React** (componenti funzionali e Hooks)
- **TypeScript**
- **Tailwind CSS**
- **React Router** per la navigazione tra home e schede di dettaglio
- **FontAwesome per React** (`@fortawesome/react-fontawesome` + pacchetti SVG), non più via CDN — vedi sezione dedicata più sotto
- **Vite** come build tool

## Avvio in locale

```bash
npm install
npm run dev      # ambiente di sviluppo
npm run build    # build di produzione (in dist/)
npm run preview  # anteprima della build
```

## Modello dati

Un'unica entità, `Quiz` (`src/types.ts`):

| Campo          | Tipo       | Note                                                          |
| -------------- | ---------- | -------------------------------------------------------------- |
| `id`           | `string`   | Identificatore univoco                                         |
| `slug`         | `string`   | Usato nell'URL `/quiz/:slug`                                   |
| `title`        | `string`   | Titolo                                                          |
| `subtitle`     | `string?`  | Opzionale                                                       |
| `coverImageUrl`| `string?`  | Es. `/images/slug.jpg`. Se assente, mostra un segnaposto       |
| `genre`        | `string`   | Campo libero, con suggerimenti in `QUIZ_GENRE_SUGGESTIONS`     |
| `tags`         | `string[]` | Parole chiave libere                                            |
| `description`  | `string`   | Descrizione del quiz                                            |
| `notes`        | `string?`  | Opzionale, mostrata in un box dedicato nella scheda             |
| `favorite`     | `boolean?` | Mostra il cuoricino "Preferito"                                 |
| `gameUrl`      | `string`   | Link al quiz giocabile, apre in una nuova scheda                |
| `editorUrl`    | `string?`  | Link all'editor del quiz, opzionale, apre in una nuova scheda   |

I dati vivono in `src/data/quizzes.ts` (due esempi già inclusi). Per aggiungerne uno nuovo non serve toccare componenti o pagine: basta un nuovo oggetto nell'array, generabile comodamente con `tools/quiz-generator.html`.

## Filtri

La home filtra per **genere** (selezione singola) e **tag** (selezione multipla, in OR tra loro): basta che il quiz abbia almeno uno dei tag selezionati per comparire nei risultati. Entrambe le liste sono derivate automaticamente dai dati in `data/quizzes.ts`, non vanno mantenute a mano.

## Le icone FontAwesome: la novità rispetto agli altri archivi

Negli altri tre siti della stessa famiglia, FontAwesome viene caricato via CDN nell'head di `index.html` e usato con la sintassi a stringa (`<i className="fa-solid fa-house">`). Qui invece si usa la sintassi React ufficiale e aggiornata ([documentazione](https://docs.fontawesome.com/web/use-with/react/add-icons)): ogni icona è un componente importato da un pacchetto npm e passato a `<FontAwesomeIcon icon={faHouse} />`.

Conseguenze pratiche:

- **Niente più link CDN** in `index.html`.
- **Quattro pacchetti in più** in `package.json`: `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/react-fontawesome`.
- Tutte le icone sono raccolte in un unico registro, **`src/lib/icons.ts`**, da cui i componenti le importano già pronte — invece di scrivere stringhe sparse in ogni file, si lavora con oggetti tipizzati (`IconDefinition`), con autocompletamento e controllo a tempo di build.

Il generatore di codice (`tools/quiz-generator.html`) fa eccezione: essendo un file HTML standalone fuori dal bundle React, lì FontAwesome resta via CDN con la sintassi classica — sono due contesti separati, e lo strumento non ha bisogno di essere coerente con le scelte tecniche del sito vero e proprio.

## Tema visivo

Palette "trivia/game show digitale": fondo viola-indaco molto scuro (`#130F23`), accento viola elettrico (`#A855F7`) per generi/link/bottoni, ciano (`#22D3EE`) per i tag, magenta acceso (`#FF2E93`) per il cuoricino "Preferito". Titoli in **Space Grotesk** (geometrico, da piattaforma digitale), corpo del testo in **Inter**.

## Deploy su Vercel tramite GitHub

1. Pusha la cartella `archivio-quiz/` come repository (o sottocartella di un monorepo) su GitHub.
2. Importa il repository su Vercel: build command `npm run build`, output directory `dist`.
3. Nessun `base` da impostare in `vite.config.ts`: quel parametro serve solo per GitHub Pages, non per Vercel.
4. Le immagini di copertina (`/images/slug.jpg`) e le eventuali altre risorse statiche vanno messe in una cartella `public/` nella radice del progetto (Vite la serve automaticamente dalla radice del sito).

## Struttura del progetto

```
archivio-quiz/
├── README.md
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── types.ts
│   ├── lib/
│   │   └── icons.ts
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── FilterBar.tsx
│   │   ├── QuizCard.tsx
│   │   └── Tag.tsx
│   ├── data/
│   │   └── quizzes.ts
│   └── pages/
│       ├── Home.tsx
│       └── QuizDetail.tsx
└── tools/
    └── quiz-generator.html
```

`tools/quiz-generator.html` vive fuori da `src/`, quindi non entra mai nella build di Vite né viene deployato: resta solo uno strumento locale per generare rapidamente il codice di un nuovo quiz da incollare in `src/data/quizzes.ts`.
