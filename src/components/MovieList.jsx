import MovieCard from "./MovieCard";

function MovieList({ movies, onDelete }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default MovieList;
