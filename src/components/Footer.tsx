import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDungeon,
  faBook,
  faChessBishop,
  faMagnifyingGlass,
  faGem,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Footer mostrato in calce a ogni pagina. Viene renderizzato in App.tsx,
 * fuori dalle <Routes> ma dentro <BrowserRouter>, così appare su ogni
 * pagina senza doverlo ripetere in Home.tsx e QuizDetail.tsx.
 */
export default function Footer(): ReactElement {
  return (
    <footer className="border-t border-[#312A53] bg-[#19152E] px-6 py-8 text-xs text-[#94A3B8]">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between gap-8 mb-6 text-left">
        {/* Prima colonna: VEDI ANCHE */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-[#E2E8F0] tracking-wider uppercase">VEDI ANCHE</h4>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href="https://my-rpg-adventures.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#A78BFA] transition-colors"
              >
                <FontAwesomeIcon icon={faDungeon} className="w-3.5 h-3.5 text-[#A78BFA]" />
                Le Cronache di Wyatt Zephirion
              </a>
            </li>
            <li>
              <a
                href="https://my-book-collection-omega.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#A78BFA] transition-colors"
              >
                <FontAwesomeIcon icon={faBook} className="w-3.5 h-3.5 text-[#A78BFA]" />
                La mia Biblioteca
              </a>
            </li>
            <li>
              <a
                href="https://my-boardgame.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#A78BFA] transition-colors"
              >
                <FontAwesomeIcon icon={faChessBishop} className="w-3.5 h-3.5 text-[#A78BFA]" />
                I miei Board Games
              </a>
            </li>
            <li>
              <a
                href="https://pine-cove.vercel.app/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#A78BFA] transition-colors"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3.5 h-3.5 text-[#A78BFA]" />
                I Segreti di Pine Cove
              </a>
            </li>
            <li>
              <a
                href="https://etherea2.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#A78BFA] transition-colors"
              >
                <FontAwesomeIcon icon={faGem} className="w-3.5 h-3.5 text-[#A78BFA]" />
                I Guardiani di Etherea
              </a>
            </li>
          </ul>
        </div>

        {/* Seconda colonna: AREA GESTIONE */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-[#E2E8F0] tracking-wider uppercase">AREA GESTIONE</h4>
          <div>
            <Link
              to="/editor"
              className="inline-flex items-center gap-2 hover:text-[#A78BFA] transition-colors"
            >
              <FontAwesomeIcon icon={faSquarePlus} className="w-3.5 h-3.5 text-[#A78BFA]" />
              Editor Schede
            </Link>
          </div>
        </div>
      </div>

      {/* Secondo blocco: disclaimer */}
      <div className="border-t border-[#312A53]/55 pt-6 text-center text-[10px] sm:text-xs">
        <p>
          Sito amatoriale senza fini di lucro. Non si intende infrangere alcun copyright. Tutti i libri, gli autori e i marchi citati appartengono ai relativi proprietari.
        </p>
      </div>
    </footer>
  );
}

