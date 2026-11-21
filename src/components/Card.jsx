function Card({film,onClick}) {
    return (
        <button className="card" onClick={() => onClick(film.id)}>
            <img src={film.image} alt={film.title}/>
            <h2>{film.title}</h2>
            <p>{film.release_date}</p>
        </button>
    );
}

export default Card;