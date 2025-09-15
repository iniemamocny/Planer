import { Link, Route, Routes } from 'react-router-dom';

const Home = () => (
  <section className="page">
    <h1>Planer</h1>
    <p>Witaj w aplikacji Planer. Tutaj pojawi się Twoja nowa przestrzeń do planowania.</p>
  </section>
);

const NotFound = () => (
  <section className="page">
    <h1>Nie znaleziono</h1>
    <p>Ta trasa jest jeszcze w przygotowaniu.</p>
    <Link to="/">Wróć do strony głównej</Link>
  </section>
);

const App = () => (
  <div className="app-shell">
    <nav className="app-nav">
      <Link to="/">Strona główna</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

export default App;
