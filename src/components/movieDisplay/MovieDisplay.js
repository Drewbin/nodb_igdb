import React , {Component} from 'react';
import axios from 'axios';
import './MovieDisplay.css';
import SearchBar from './searchBar/SearchBar'

export default class MovieDisplay extends Component {
    constructor(props) {
        super(props);

        this.setState = {
            movieList : [],
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3003/api/current/movies').then(response => {
            this.setState({ movieList : response.data.results })
        }).catch((err) => {
            console.error(err);
        })
    }
    
    render(){
        const imgURL= 'http://image.tmdb.org/t/p/original';
        const movies= this.state.moviesList.map((movie, index)=> {
          return(
            <div key={ index } className='movie-card'>
              <img style={{ height: '85%', width: '100%' }} src={ imgURL + movie.poster_path } alt='movie poster'></img>
              <SearchBar />
              <h3>{ movie.original_title }</h3>
              <p>Rating: { movie.vote_average }/10</p>
            </div>
          )
        });
    
        return(
          <div className='movies-container-main'>
            { movies }
          </div>
        )
      }
    }