import { useState, useEffect } from "react";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function App() {
  const [films, setFilms] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadFilms() {
      try {
        const res = await fetch("https://ghibliapi.vercel.app/films");
        if (!res.ok) throw new Error("Could not load films");
        const data = await res.json();
        if (!ignore) {
          setFilms(shuffle(data.slice(0, 12)));
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadFilms();

    return () => {
      ignore = true;
    };
  }, []);

  function handleCardClick(id) {
    if (clickedIds.includes(id)) {
      setMessage("Oh no, you picked that one already! Starting over.");
      setClickedIds([]);
    } else {
      const newClickedIds = [...clickedIds, id];
      setBestScore(Math.max(bestScore, newClickedIds.length));

      if (newClickedIds.length === films.length) {
        setMessage("You remembered them all! You win!");
        setClickedIds([]);
      } else {
        setMessage("");
        setClickedIds(newClickedIds);
      }
    }
    setFilms(shuffle(films));
  }
  if (loading) return <p className="status">Loading films...</p>;
  if (error) return <p className="status">Something went wrong: {error}</p>;

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Sky Meadow Memory</h1>
          <p className="subtitle">
            Click a film poster, but never the same one twice!
          </p>
        </div>
        <Scoreboard score={clickedIds.length} bestScore={bestScore} />
      </header>

      {message && <p className="message">{message}</p>}

      <main className="card-grid">
        {films.map((film) => (
          <Card key={film.id} film={film} onClick={handleCardClick} />
        ))}
      </main>
    </div>
  );
}

export default App;