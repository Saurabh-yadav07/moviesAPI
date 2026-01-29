import { useState, useEffect, useCallback, useMemo } from "react";
import { getMovies } from "../api/movieService";
import MovieList from "../components/MovieList";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newMovie, setNewMovie] = useState({
    title: "",
    year: "",
    director: "",
  });

  // Fetch movies (memoized)
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

  // Form change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setNewMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Add movie handler
  const handleAddMovie = useCallback(
    (e) => {
      e.preventDefault();

      const newMovieObj = {
        ...newMovie,
        id: Date.now(),
      };

      console.log(newMovieObj);

      // reset form
      setNewMovie({
        title: "",
        year: "",
        director: "",
      });
    },
    [newMovie]
  );

  // Memoized movie list
  const memoizedMovies = useMemo(() => movies, [movies]);

  return (
    <div className="movies-page">
      <h1>Star Wars Movies</h1>

      {/*  Fetch Movies Button */}
      <button className="fetch-btn" onClick={fetchMovies} disabled={loading}>
        {loading ? "Loading..." : "Fetch Movies"}
      </button>

      {/*  Add Movie Form (below button) */}
      <form className="add-movie-form" onSubmit={handleAddMovie}>
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={newMovie.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="year"
          placeholder="Release Year"
          value={newMovie.year}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="director"
          placeholder="Director"
          value={newMovie.director}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Movie</button>
      </form>

      {/* Error */}
      {error && <p className="error-text">{error}</p>}

      {/* Movie List (below form) */}
      {!loading && !error && <MovieList movies={memoizedMovies} />}
    </div>
  );
}

export default Movies;
