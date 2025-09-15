import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';

type TabId = 'szafki' | 'pomieszczenie' | 'koszty' | 'formatki';

type TabSection = {
  id: TabId;
  label: string;
  title: string;
  lead: string;
  highlights: string[];
  summary: string;
};

const TAB_SECTIONS: TabSection[] = [
  {
    id: 'szafki',
    label: 'Szafki',
    title: 'Moduły szafek pod pełną kontrolą',
    lead: 'Zaplanuj układ korpusów i frontów dopasowany do każdego wnętrza.',
    highlights: [
      'Korzystaj z biblioteki modułów dolnych, górnych i wysokich z gotowymi rozstawami.',
      'Definiuj kolory, okucia oraz fronty z natychmiastowym podglądem zmian.',
      'Pilnuj ergonomii dzięki inteligentnym odstępom i blokadom kolizji.',
    ],
    summary:
      'Planer automatycznie aktualizuje wymiary i sugeruje optymalne ułożenie szafek, aby Twój projekt był gotowy do produkcji.',
  },
  {
    id: 'pomieszczenie',
    label: 'Pomieszczenie',
    title: 'Modelowanie pomieszczenia krok po kroku',
    lead: 'Zacznij od dokładnych wymiarów i elementów wyposażenia, aby zbudować wiarygodny model.',
    highlights: [
      'Wprowadź wymiary ścian, wnęk, okien i instalacji bezpośrednio na siatce pomiarowej.',
      'Zobacz natychmiastowy podgląd 2D oraz lekką wizualizację 3D.',
      'Zapisuj warianty układu i porównuj je z klientem w jednym miejscu.',
    ],
    summary:
      'Każda zmiana w pomieszczeniu automatycznie aktualizuje przestrzeń roboczą dla szafek i pozostałych etapów projektu.',
  },
  {
    id: 'koszty',
    label: 'Koszty',
    title: 'Kontrola kosztów i materiałów',
    lead: 'Budżet projektu aktualizuje się wraz z każdym modułem i dodatkiem.',
    highlights: [
      'Łącz cenniki materiałów, okuć i robocizny w jednym kalkulatorze.',
      'Porównuj warianty cenowe oraz twórz wyceny gotowe do wysłania klientowi.',
      'Dodawaj własne marże i automatycznie aktualizuj podsumowania VAT.',
    ],
    summary:
      'Moduł kosztów pokazuje przejrzyste rozbicie pozycji i pomaga utrzymać rentowność każdego projektu.',
  },
  {
    id: 'formatki',
    label: 'Formatki',
    title: 'Listy formatek i produkcja',
    lead: 'Generuj komplet dokumentów do cięcia bez żmudnego przepisywania wymiarów.',
    highlights: [
      'Eksportuj listy elementów do formatu CSV, PDF lub bezpośrednio do programu rozkroju.',
      'Oznaczaj krawędzie, okleiny i wiercenia, aby uniknąć pomyłek na produkcji.',
      'Śledź status przygotowania formatek i weryfikuj stany magazynowe.',
    ],
    summary:
      'Automatyczne listy formatek zamykają proces projektowy, dzięki czemu możesz od razu przekazać projekt do produkcji.',
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState<TabId>(TAB_SECTIONS[0]?.id ?? 'szafki');
  const activeSection =
    TAB_SECTIONS.find((section) => section.id === activeTab) ?? TAB_SECTIONS[0];

  return (
    <section className="page home">
      <header className="hero">
        <span className="hero-eyebrow">Planowanie zabudów meblowych</span>
        <h1>Stwórz kompletny projekt zabudowy od pomiaru po listę formatek</h1>
        <p className="hero-lead">
          Planer prowadzi przez każdy etap pracy nad zabudową — od stworzenia pomieszczenia,
          przez konfigurację szafek, aż po szczegółową wycenę i dokumentację dla produkcji.
        </p>
        <div className="hero-actions">
          <button
            type="button"
            className="primary-action"
            onClick={() => setActiveTab('szafki')}
          >
            Zacznij od szafek
          </button>
          <button
            type="button"
            className="secondary-action"
            onClick={() => setActiveTab('koszty')}
          >
            Zobacz moduł kosztów
          </button>
        </div>
      </header>

      <div className="tab-bar" role="tablist" aria-label="Sekcje planera">
        {TAB_SECTIONS.map((section) => {
          const isActive = activeSection.id === section.id;
          return (
            <button
              key={section.id}
              type="button"
              id={`tab-${section.id}`}
              className={`tab-button${isActive ? ' is-active' : ''}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${section.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(section.id)}
            >
              {section.label}
            </button>
          );
        })}
      </div>

      <article
        className="tab-content"
        id={`panel-${activeSection.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeSection.id}`}
      >
        <div>
          <h2>{activeSection.title}</h2>
          <p className="tab-lead">{activeSection.lead}</p>
        </div>
        <ul className="tab-list">
          {activeSection.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <div className="tab-summary">{activeSection.summary}</div>
      </article>
    </section>
  );
};

const NotFound = () => (
  <section className="page">
    <article className="info-card">
      <h1>Nie znaleziono strony</h1>
      <p>Ta trasa jest jeszcze w przygotowaniu.</p>
      <Link to="/" className="return-link">
        Wróć do strony głównej
      </Link>
    </article>
  </section>
);

const App = () => (
  <div className="app-shell">
    <nav className="app-nav">
      <Link to="/" className="app-brand">
        Planer
      </Link>
      <div className="app-nav-actions">
        <span className="app-nav-note">Wersja demonstracyjna</span>
      </div>
    </nav>
    <main className="app-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <footer className="app-footer">
      © {new Date().getFullYear()} Planer. Przestrzeń do projektowania zabudów meblowych.
    </footer>
  </div>
);

export default App;
