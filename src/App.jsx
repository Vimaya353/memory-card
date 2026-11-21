import { useState,useEffect } from "react";
import Card from "./components/Card";


function App() {
  const [films,setFilms] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadFilms() {
      try {
        const res = await fetch("https://ghibliapi.vercel.app/films");
        if (!res.ok) throw new Error("Could not load films");
        const data = await res.json();
        if (!ignore) {
          setFilms(data.slice(0,12));
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

  function handleCardClick(id)  {
     console.log("Clicked card:",id);
  }

  if (loading) return <p>Loading films...</p>
  if (error) return <p>Something went wrong: {error}</p>;

   return (
    <div>
      <h1>Memory Card Game</h1>
      <div className="card-grid">
         {films.map((film) => (
          <Card key={film.id} film={film} onClick={handleCardClick}/>
         ))}
      </div>
    </div>
   );
}

export default App;