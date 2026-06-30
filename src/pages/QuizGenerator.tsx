import { useState } from "react";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "../lib/icons";

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function tsString(value: string): string {
  return JSON.stringify(value || "");
}

function indentBlock(text: string, spaces: number): string {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => pad + line)
    .join("\n");
}

export default function QuizGenerator(): ReactElement {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [quizId, setQuizId] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [gameUrl, setGameUrl] = useState("");
  const [editorUrl, setEditorUrl] = useState("");
  const [favorite, setFavorite] = useState(false);

  const [slugTouched, setSlugTouched] = useState(false);
  const [coverTouched, setCoverTouched] = useState(false);
  const [idTouched, setIdTouched] = useState(false);

  const [generatedCode, setGeneratedCode] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copia codice");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    const newSlug = slugify(val);
    let currentSlug = slug;
    if (!slugTouched) {
      setSlug(newSlug);
      currentSlug = newSlug;
    }
    if (!idTouched) {
      setQuizId(currentSlug);
    }
    if (!coverTouched) {
      setCoverImageUrl(currentSlug ? "/images/" + currentSlug + ".jpg" : "");
    }
  };

  const handleSlugChange = (val: string) => {
    setSlug(val);
    setSlugTouched(true);
    if (!idTouched) {
      setQuizId(val);
    }
    if (!coverTouched) {
      setCoverImageUrl(val ? "/images/" + val + ".jpg" : "");
    }
  };

  const handleGenerate = () => {
    if (!title.trim() || !description.trim() || !gameUrl.trim()) {
      alert("Compila almeno Titolo, Descrizione e Link al gioco online prima di generare il codice.");
      return;
    }

    const finalSlug = slug.trim() || slugify(title);
    const finalId = quizId.trim() || finalSlug;
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const lines = [
      "id: " + tsString(finalId) + ",",
      "slug: " + tsString(finalSlug) + ",",
      "title: " + tsString(title) + ",",
    ];
    if (subtitle.trim()) lines.push("subtitle: " + tsString(subtitle) + ",");
    if (coverImageUrl.trim()) lines.push("coverImageUrl: " + tsString(coverImageUrl) + ",");
    lines.push("genre: " + tsString(genre) + ",");
    lines.push("tags: [" + tagList.map(tsString).join(", ") + "],");
    lines.push("description: " + tsString(description) + ",");
    if (notes.trim()) lines.push("notes: " + tsString(notes) + ",");
    lines.push("favorite: " + favorite + ",");
    lines.push("gameUrl: " + tsString(gameUrl) + ",");
    if (editorUrl.trim()) lines.push("editorUrl: " + tsString(editorUrl) + ",");

    const code = "{\n" + indentBlock(lines.join("\n"), 2) + "\n},";
    setGeneratedCode(code);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(generatedCode)
      .then(() => {
        setCopyLabel("Copiato!");
        setTimeout(() => setCopyLabel("Copia codice"), 1500);
      })
      .catch(() => {
        // Fallback
      });
  };

  const handleReset = () => {
    setTitle("");
    setSubtitle("");
    setSlug("");
    setQuizId("");
    setCoverImageUrl("");
    setGenre("");
    setTags("");
    setDescription("");
    setNotes("");
    setGameUrl("");
    setEditorUrl("");
    setFavorite(false);
    setSlugTouched(false);
    setCoverTouched(false);
    setIdTouched(false);
    setGeneratedCode("");
  };

  return (
    <div className="min-h-screen bg-[#EA580C] text-[#FFF3E0]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <header className="mb-8">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#FFE0B2] hover:text-[#FF8C00]"
          >
            <FontAwesomeIcon icon={ICONS.arrowLeft} aria-hidden="true" />
            Torna a I Miei Quiz
          </Link>
          <div className="flex items-center gap-3 text-[#F97316] mt-2">
            <FontAwesomeIcon icon={ICONS.editor} className="text-xl" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">Generatore di Quiz</span>
          </div>
          <h1 className="font-display mt-2 font-bold text-3xl sm:text-4xl">Generatore di quiz</h1>
          <p className="mt-2 text-sm text-[#FFE0B2] max-w-2xl">
            Compila il form, premi <strong>"Genera codice"</strong> e incolla il risultato in{" "}
            <code className="rounded bg-[#2D1B0F] px-1.5 py-0.5 text-[#F97316]">src/data/quizzes.ts</code>
            , subito dopo un oggetto esistente (prima della parentesi quadra finale dell'array).
          </p>
        </header>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <section className="rounded-xl border border-[#4E2D13] bg-[#1E130B] p-5 flex flex-col gap-4">
            <h2 className="font-display font-bold text-lg text-[#FFF3E0]">Dati del quiz</h2>

            <div>
              <label className="block text-sm font-semibold mb-1 text-[#FFE0B2]" htmlFor="title">Titolo *</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full rounded-lg bg-[#2D1B0F] border border-[#4E2D13] px-3 py-2 text-[#FFF3E0] placeholder-[#8F705B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                placeholder="Capitali del Mondo Express"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-[#FFE0B2]" htmlFor="subtitle">Sottotitolo</label>
              <input
                id="subtitle"
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full rounded-lg bg-[#2D1B0F] border border-[#4E2D13] px-3 py-2 text-[#FFF3E0] placeholder-[#8F705B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                placeholder="Quante capitali riconosci in meno di 60 secondi?"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#FFE0B2]" htmlFor="slug">
                  Slug <span className="text-[#8F705B] font-normal">(generato dal titolo)</span>
                </label>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  className="w-full rounded-lg bg-[#2D1B0F] border border-[#4E2D13] px-3 py-2 text-[#FFF3E0] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#FFE0B2]" htmlFor="quizId">
                  ID <span className="text-[#8F705B] font-normal">(clonato dallo slug)</span>
                </label>
                <input
                  id="quizId"
                  type="text"
                  value={quizId}
                  onChange={(e) => {
                    setQuizId(e.target.value);
                    setIdTouched(true);
                  }}
                  className="w-full rounded-lg bg-[#2D1B0F] border border-[#4E2D13] px-3 py-2 text-[#FFF3E0] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-[#FFE0B2]" htmlFor="coverImageUrl">
                URL immagine di copertina
              </label>
              <input
                id="coverImageUrl"
                type="text"
                value={coverImageUrl}
                onChange={(e) => {
                  setCoverImageUrl(e.target.value);
                  setCoverTouched(true);
                }}
                className="w-full rounded-lg bg-[#2D1B0F] border border-[#4E2D13] px-3 py-2 text-[#FFF3E0] placeholder-[#8F705B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                placeholder="/images/slug.jpg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#FFE0B2]" htmlFor="genre">Genere</label>
                <input
                  id="genre"
                  type="text"
                  list="genre-suggestions"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full rounded-lg bg-[#2D1B0F] border border-[#4E2D13] px-3 py-2 text-[#FFF3E0] placeholder-[#8F705B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                  placeholder="Geografia"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#FFE0B2]" htmlFor="tags">Tag</label>
                <input
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full rounded-lg bg-[#2D1B0F] border border-[#4E2D13] px-3 py-2 text-[#FFF3E0] placeholder-[#8F705B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                  placeholder="capitali, velocita (separati da virgola)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-[#FFE0B2]" htmlFor="description">Descrizione *</label>
              <textarea
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg bg-[#2D1B0F] border border-[#4E2D13] px-3 py-2 text-[#FFF3E0] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-[#FFE0B2]" htmlFor="notes">Note</label>
              <textarea
                id="notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg bg-[#2D1B0F] border border-[#4E2D13] px-3 py-2 text-[#FFF3E0] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#FFE0B2]" htmlFor="gameUrl">Link al gioco online *</label>
                <input
                  id="gameUrl"
                  type="text"
                  value={gameUrl}
                  onChange={(e) => setGameUrl(e.target.value)}
                  className="w-full rounded-lg bg-[#2D1B0F] border border-[#4E2D13] px-3 py-2 text-[#FFF3E0] placeholder-[#8F705B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#FFE0B2]" htmlFor="editorUrl">Link all'editor</label>
                <input
                  id="editorUrl"
                  type="text"
                  value={editorUrl}
                  onChange={(e) => setEditorUrl(e.target.value)}
                  className="w-full rounded-lg bg-[#2D1B0F] border border-[#4E2D13] px-3 py-2 text-[#FFF3E0] placeholder-[#8F705B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                  placeholder="https://... (opzionale)"
                />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none text-[#FFE0B2]">
              <input
                id="favorite"
                type="checkbox"
                checked={favorite}
                onChange={(e) => setFavorite(e.target.checked)}
                className="h-4 w-4 rounded bg-[#2D1B0F] border-[#4E2D13] text-[#F97316] focus:ring-offset-[#1E130B] focus:ring-[#F97316]"
              />
              Preferito
            </label>
          </section>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleGenerate}
              className="inline-flex items-center gap-2 rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-[#1E130B] hover:bg-[#FF8C00] transition"
            >
              <FontAwesomeIcon icon={ICONS.editor} aria-hidden="true" /> Genera codice
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full border border-[#4E2D13] px-5 py-2.5 text-sm font-semibold text-[#FFE0B2] hover:bg-[#1E130B] transition"
            >
              <FontAwesomeIcon icon={ICONS.reset} aria-hidden="true" /> Svuota form
            </button>
          </div>
        </form>

        {generatedCode && (
          <section className="mt-10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-lg text-[#FFF3E0]">Codice generato</h2>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#F97316]/40 px-3.5 py-1.5 text-xs font-semibold text-[#F97316] hover:bg-[#F97316]/10 transition"
              >
                <span>{copyLabel}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={14}
              value={generatedCode}
              className="w-full rounded-lg bg-[#1E130B] border border-[#4E2D13] p-4 font-mono text-xs text-[#FFE0B2] focus:outline-none"
            />
          </section>
        )}
      </div>

      <datalist id="genre-suggestions">
        <option value="Cultura generale"></option>
        <option value="Cinema"></option>
        <option value="Musica"></option>
        <option value="Storia"></option>
        <option value="Geografia"></option>
        <option value="Scienza"></option>
        <option value="Sport"></option>
        <option value="Videogiochi"></option>
        <option value="Letteratura"></option>
      </datalist>
    </div>
  );
}
