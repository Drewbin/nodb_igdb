import React , {Component} from 'react';
import axios from 'axios';
import './MovieDisplay.css';
import SearchBar from './searchBar/SearchBar'
import FavoriteMovies from './favorites/FavoriteMovies'

export default class MovieDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movieList : [],
            searchVal : '',
            faveList : [],
            
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3003/api/current/movies').then(response => {
            console.log(response)
            this.setState({ movieList : response.data.results })
        }).catch((err) => {
            console.error(err);
        })
    }

    componentWillMount() {
      axios.get('http://localhost:3003/api/favorite/movies').then(response => {
        this.setState({ faveList : response.data });
      });
    }

    handleSearchChange(input) {
      this.setState({ searchVal : input });
    }

    submitSearch() {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ef6c1d08711de9897471cf423a857236&query=${this.state.searchVal}`).then(response => {
          this.setState({ movieList : response.data.results, searchVal : ''})
      }).catch((err) => {
          console.error(err);
      })
    }

    addToFavorites(id) {
      axios.post('http://localhost:3003/api/favorite/movies/', {id}).then(response => {
        this.setState({ faveList : response.data });
      });
    }

    deleteFromFavorites(id) {
      axios.delete('http://localhost:3003/api/favorite/movies/' + id).then(response => {
        this.setState({ faveList : response.data });
      });
    }
    
    render(){
      const imgUrl = 'http://image.tmdb.org/t/p/original';
      let mappedMoviesList = this.state.movieList.map((movie, index) => {
        return(
          <div key={index}>
            <a href={'https://www.themoviedb.org/movie/'+ movie.id} >
              <img
                style={{ height: '200px', width: '130px' }} 
                src={ imgUrl + movie.poster_path } 
                alt='movie poster'
                />
            </a>
            <h2>{movie.title}</h2>
            {movie.overview}
            <button
              type='button'
              onClick={() => this.addToFavorites(movie.id)}>💖</button>



          </div>
        )
      })
        console.log(this.state.faveList)
        return(
          <div>
            <SearchBar 
              handleSearchChange={this.handleSearchChange} 
              submitSearch={this.submitSearch}/>

            {mappedMoviesList}
            
            <FavoriteMovies 
              favoriteMovies={this.state.faveList}
              removeFromFavorites={id => this.deleteFromFavorites(id)} />
              
          </div>
          )
      }
}
