import { useState } from "react";
import { getMovies } from "../api/movieService";
import MovieList from "../components/MovieList";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  async function fetchMovies() {
    setLoading(true);
    try {
      const moviesArray = await getMovies();
      setMovies(moviesArray);
      setShowList(true); // 👈 show second section after fetch
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* SECTION 1 */}
      <section>
        <h1>Star Wars Movies</h1>
        <button onClick={fetchMovies} disabled={loading}>
          {loading ? "Fetching..." : "Fetch Movies"}
        </button>
      </section>

      {/* SECTION 2 */}
      {showList && (
        <section>
          {loading && <h2>Loading...</h2>}
          {!loading && <MovieList movies={movies} />}
        </section>
      )}
    </div>
  );
}

export default Movies;
