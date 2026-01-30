function MovieCard({ movie, onDelete }) {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>

      <p>Year: {movie.year}</p>
      <p>Director: {movie.director}</p>

      <button className="delete-btn" onClick={() =>{ onDelete(movie.id)}}>
        Delete
      </button>
    </div>
  );
}

export default MovieCard;
