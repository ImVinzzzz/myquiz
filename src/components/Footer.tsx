import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "../lib/icons";

/**
 * Footer mostrato in calce a ogni pagina. Viene renderizzato in App.tsx,
 * fuori dalle <Routes> ma dentro <BrowserRouter>, così appare su ogni
 * pagina senza doverlo ripetere in Home.tsx e QuizDetail.tsx.
 */
export default function Footer(): ReactElement {
  return (
    <footer className="border-t border-[#4E2D13] bg-[#1E130B] px-6 py-6 text-center text-xs text-[#8F705B] flex flex-col items-center gap-3">
      <p>
        Sito amatoriale senza fini di lucro. Non si intende infrangere alcun copyright.
        Tutti i marchi e le piattaforme citate appartengono ai relativi proprietari.
      </p>
      <div className="flex items-center justify-center">
        <Link
          to="/editor"
          className="inline-flex items-center gap-1.5 font-semibold text-[#F97316] hover:text-[#FF8C00] transition-colors"
        >
          <FontAwesomeIcon icon={ICONS.editor} aria-hidden="true" />
          editor schede
        </Link>
      </div>
    </footer>
  );
}
