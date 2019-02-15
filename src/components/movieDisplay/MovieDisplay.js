import React , {Component} from 'react';
import axios from 'axios';
import './MovieDisplay.css';
import SearchBar from './searchBar/SearchBar'
import Favorites from './favorites/Favorites'

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
      let fave = this.state.movieList.filter((movie, index) => {
        return (
          movie.id == id
        )
      })
      this.setState({
        faveList : fave,
      })
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

            <Favorites addToFavorites={this.addToFavorites}
            id={movie.id}/>

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
            
            <h1>Favorites</h1>
            {this.state.faveList}
              
          </div>
          )
      }
}
