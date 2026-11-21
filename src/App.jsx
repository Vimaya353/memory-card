import Card from "./components/Card";

const fakeFilms = [
  {id:"1",title:"Fake Film One",release_date:"1986",image:"https://placehold.co/200x300"},
  {id: "2", title: "Fake Film Two", release_date: "1988", image: "https://placehold.co/200x300" },
  {id: "3", title: "Fake Film Three", release_date: "1989", image: "https://placehold.co/200x300" },
];

function App() {
  function handleCardClick(id)  {
     console.log("Clicked card:",id);
  }

   return (
    <div>
      <h1>Memory Card Game</h1>
      <div className="card-grid">
         {fakeFilms.map((film) => (
          <Card key={film.id} film={film} onClick={handleCardClick}/>
         ))}
      </div>
    </div>
   );
}

export default App;