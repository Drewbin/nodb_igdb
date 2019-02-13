const results = response.results;
  
var movieRows = [];

results.forEach((movie) => {
  movie.poster_src = 'https://image.tmdb.org/t/p/w185' + movie.poster_path;
  const movieRow = <MovieDisplay key={movie.id} movie={movie} />
  movieRows.push(movieRow)
})