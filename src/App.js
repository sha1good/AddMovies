import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const addMovieHandler = async (movie) => {
    setIsloading(true);
    setError(false);
    try {
      const response = await fetch(
        "https://my-react-https-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log(data);
      alert("Movies has been added Successfully");
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  };

  const fetchMoviesHandler = useCallback(async () => {
    setIsloading(true);
    setError(false);
    try {
      const response = await fetch(
        "https://my-react-https-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Unable to Fetch Data at the moment");
      }
      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openningText: data[key].openningText,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        {!isLoading && <AddMovie onAddMovie={addMovieHandler} />}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Submitting your movie to the list</p>}
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movie</button>
      </section>

      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found No Movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p> Keep Calm, Movies is loading!</p>}
      </section>
    </React.Fragment>
  );
};

export default App;
