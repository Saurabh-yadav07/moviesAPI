import { useState, useEffect, useCallback, useMemo } from "react";
import { getMovies } from "../api/movieService";
import MovieList from "../components/MovieList";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  useCallback → prevents function recreation on every render
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const moviesArray = await getMovies();
      setMovies(moviesArray);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }, []);

  //  useEffect → API call when component mounts
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  //  useMemo → memoize movies list
  const memoizedMovies = useMemo(() => movies, [movies]);

  return (
    <div className="movies-page">
      <section className="header-section">
        <h1>Star Wars Movies</h1>
      </section>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && <MovieList movies={memoizedMovies} />}
    </div>
  );
}

export default Movies;
