function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p>Episode: {movie.episode_id}</p>
      <p>Director: {movie.director}</p>
      <p>Release Date: {movie.release_date}</p>
    </div>
  );
}

export default MovieCard;
