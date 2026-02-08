import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchIcon from './search.svg'
import './App.css'
import MoviesCard from './MoviesCard';

const API_URI = 'https://www.omdbapi.com/?apikey=de559d53';

const movie1 = {
  "Title": "The Amazing Spiderman 2 Webb Cut",
  "Year": "2021",
  "imdbID": "tt18351128",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BYzYzZDViNWYtNWViMS00NDMxLThlN2YtZjFkOWMwODkzNzhiXkEyXkFqcGdeQXVyMTUwMzM4NzU0._V1_SX300.jpg"
}

const App = () => {
  const searchMovies = ((title) => {
    axios.get(`${API_URI}&s=${title}`).then(response => {
      setMovies(response.data.Search)
    })
  })
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
  }
  const handleSearch = () => {
    searchMovies(input);
  }
  useEffect(() => {
    searchMovies('Batman')
  }, [])

  return (
    <>
      <div className="app">
        <h1>MovieLand</h1>
        <div className="search">
          <input placeholder='Search for Movies' value={input} onChange={handleInput} />
          <img src={SearchIcon} alt='search' onClick={handleSearch} />
        </div>
        {
          movies.length > 0
            ?
            <div className="container">
              {movies.map((movie) => (
                <MoviesCard movie1={movie} />
              ))}
            </div>
            :
            <div className="empty">
              <h3>No Movies Found</h3>
            </div>
        }
      </div>
    </>
  )
}

export default App