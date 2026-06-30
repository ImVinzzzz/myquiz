import type { ReactElement } from 'react';

/**
 * Footer mostrato in calce a ogni pagina. Viene renderizzato in App.tsx,
 * fuori dalle <Routes> ma dentro <BrowserRouter>, così appare su ogni
 * pagina senza doverlo ripetere in Home.tsx e QuizDetail.tsx.
 */
export default function Footer(): ReactElement {
  return (
    <footer className="border-t border-[#4E2D13] bg-[#1E130B] px-6 py-6 text-center text-xs text-[#8F705B]">
      <p>
        Sito amatoriale senza fini di lucro. Non si intende infrangere alcun copyright.
        Tutti i marchi e le piattaforme citate appartengono ai relativi proprietari.
      </p>
    </footer>
  );
}
