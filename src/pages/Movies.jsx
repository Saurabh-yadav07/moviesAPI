import { useState, useEffect, useCallback, useMemo } from "react";
import {
  fetchMovies,
  addMovie,
  deleteMovie,
} from "../api/firebaseMovieService";
import MovieList from "../components/MovieList";
import AddMovieForm from "../components/AddMovieForm";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  Fetch movies from Firebase
  const loadMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message || "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load movies on mount
  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  // Add movie (called from AddMovieForm)
  const handleAddMovie = useCallback(async (movieData) => {
    try {
      const savedMovie = await addMovie(movieData);
      setMovies((prev) => [...prev, savedMovie]);
    } catch (err) {
      setError(err.message || "Failed to add movie");
    }
  }, []);

  // Delete movie (DB + UI)
  const handleDeleteMovie = useCallback(async (id) => {
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete movie");
    }
  }, []);

  // Memoised movies list
  const memoizedMovies = useMemo(() => movies, [movies]);

  return (
    <div className="movies-page">
      <h1>Star Wars Movies</h1>

      {/* Fetch button */}
      <button className="fetch-btn" onClick={loadMovies} disabled={loading}>
        {loading ? "Loading..." : "Fetch Movies"}
      </button>

      {/* Add Movie Form */}
      <AddMovieForm onAddMovie={handleAddMovie} loading={loading} />

      {/* Error */}
      {error && <p className="error-text">{error}</p>}

      {/* Movie List */}
      <MovieList movies={memoizedMovies} onDelete={handleDeleteMovie} />
    </div>
  );
}

export default Movies;
