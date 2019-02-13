import axios from "axios";

performSearch(searchTerm) {
  console.log("Perform search using Movie DB")
  const urlString = 'https://api.themoviedb.org/3/search/movie?api_key=ef6c1d08711de9897471cf423a857236&query=' + searchTerm;
  $.ajax({
    url: urlString,
    success: (searchResults) => {
      console.log('Success!')
      const results = searchResults.results


      var movieRows = [];
      
      results.forEach((movie) => {
        movie.poster_src = 'https://image.tmdb.org/t/p/w185' + movie.poster_path
        const movieRow = <MovieRow key={movie.id} movie={movie} />
        movieRows.push(movieRow)
      })

      this.setState({rows: movieRows})
    },
    error: (xhr, status, err) => {
      console.error('Failed!')
    }
  })
}


getMovies(input) {
  
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=ef6c1d08711de9897471cf423a857236&query=' + input).then((response) => {
    console.log('Success!');
    const results = response.results;

    var movieRows = [];

    results.forEach((movie) => {
      movie.poster_src = 'https://image.tmdb.org/t/p/w185' + movie.poster_path;
      const movieRow = <MovieRow key={movie.id} movie={movie} />
      movieRows.push(movieRow)
    })

    this.setState({rows: movieRows})
  }).catch((err) => {
    console.error(err);
  })
};

searchChangeHandler(event) {
  console.log(event.target.value)
  const input = event.target.value
  this.getMovies(input)
}