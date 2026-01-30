const BASE_URL =
  "https://movies-143c7-default-rtdb.firebaseio.com/movies";

// GET movies
export const fetchMovies = async () => {
  const response = await fetch(`${BASE_URL}.json`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  if (!data) return [];

  return Object.keys(data).map((id) => ({
    id,
    ...data[id],
  }));
};

// ADD movie
export const addMovie = async (movie) => {
  const response = await fetch(`${BASE_URL}.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error("Failed to add movie");
  }

  const data = await response.json(); 

  return {
    id: data.name,
    ...movie,
  };
};

// DELETE movie
export const deleteMovie = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}.json`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete movie");
  }
};
