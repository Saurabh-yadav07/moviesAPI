import { useState, useCallback } from "react";

function AddMovieForm({ onAddMovie, loading }) {
  const [newMovie, setNewMovie] = useState({
    title: "",
    year: "",
    director: "",
  });

  // Controlled input handler (memoised)
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setNewMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Submit handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      onAddMovie(newMovie);

      // reset form
      setNewMovie({
        title: "",
        year: "",
        director: "",
      });
    },
    [newMovie, onAddMovie]
  );

  return (
    <form className="add-movie-form" onSubmit={handleSubmit}>
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

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Movie"}
      </button>
    </form>
  );
}

export default AddMovieForm;
