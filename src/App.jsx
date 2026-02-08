import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchIcon from './search.svg'
import './App.css'
import MoviesCard from './MoviesCard';

const API_URI = 'https://www.omdbapi.com/?apikey=de559d53';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = ((title) => {
    if (!title.trim()) {
      setError('Please enter a movie title');
      setMovies([]);
      return;
    }
    setLoading(true);
    setError('');
    axios.get(`${API_URI}&s=${title}`).then(response => {
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setError('');
      } else {
        setMovies([]);
        setError(response.data.Error || 'No movies found');
      }
      setLoading(false);
    }).catch(err => {
      setMovies([]);
      setError('Failed to fetch movies. Please try again.');
      setLoading(false);
    })
  })

  const handleInput = (e) => {
    setInput(e.target.value);
  }
  const handleSearch = () => {
    searchMovies(input);
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchMovies(input);
    }
  }
  useEffect(() => {
    searchMovies('Batman')
  }, [])

  return (
    <>
      <div className="app">
        <h1>MovieLand</h1>
        <p className="subtitle">Discover millions of movies</p>
        <div className="search">
          <input placeholder='Search for Movies' value={input} onChange={handleInput} onKeyPress={handleKeyPress} />
          <img src={SearchIcon} alt='search' onClick={handleSearch} />
        </div>
        {loading && <div className="loading"><div className="spinner"></div></div>}
        {error && <div className="error"><h3>{error}</h3></div>}
        {
          !loading && movies.length > 0
            ?
            <div className="container">
              {movies.map((movie) => (
                <MoviesCard movieDetails={movie} key={movie.imdbID} />
              ))}
            </div>
            :
            !loading && !error && <div className="empty"><h3>No Movies Found</h3></div>
        }
      </div>
    </>
  )
}

export default App