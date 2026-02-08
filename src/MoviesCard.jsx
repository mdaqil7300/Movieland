const MoviesCard = ({ movieDetails }) => {
    const handleViewImdb = () => {
        window.open(`https://www.imdb.com/title/${movieDetails.imdbID}/`, '_blank');
    }
    return (
        <>
            <div className="movie">
                <div>
                    <p>{movieDetails.Year}</p>
                </div>
                <div>
                    <img src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'https://via.placeholder.com/400'} alt="" />
                </div>
                <div>
                    <span>{movieDetails.Type}</span>
                    <h3>{movieDetails.Title}</h3>
                    <button className="imdb-link" onClick={handleViewImdb}>View on IMDb</button>
                </div>
            </div>
        </>
    )
}

export default MoviesCard;