import type { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import QuizDetail from './pages/QuizDetail';
import Footer from './components/Footer';

/**
 * Componente radice dell'app: configura il routing tra la home (griglia +
 * filtri dei quiz) e la scheda di dettaglio di ciascun quiz.
 *
 * Richiede react-router-dom:
 *   npm install react-router-dom
 *
 * I Google Fonts vanno inseriti nell'<head> di index.html (vedi
 * index.html). Le icone FontAwesome, invece, NON passano più da un link
 * CDN: sono componenti React importati dai pacchetti @fortawesome/*,
 * vedi src/lib/icons.ts.
 */
export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:slug" element={<QuizDetail />} />
        {/* Qualsiasi path non riconosciuto riporta in home */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
