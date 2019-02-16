import React, { Component } from 'react';
import axios from 'axios';

export default class Favorites extends Component {
        
        state = {
            faveMovies : [],
        };
    
    componentWillReceiveProps(props) {
       Promise.all(props.favoriteMovies.map(id => (
           axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=ef6c1d08711de9897471cf423a857236`).then(response => response.data)
       )))
          .then(faveMovies => {
              this.setState({ faveMovies });
          });
    }


    render() {
        const faveMovies = this.state.faveMovies.map(movie => (
            <div key={movie.id}>
                <h3>{movie.original_title}</h3>
                <button 
                    type='button'
                    onClick={() => this.props.removeFromFavorites(movie.id)} >🖤</button>
            </div>
        ))
        return(
            <div>
                <h2>💛Favorites💛</h2>

                {faveMovies}
            </div>
        )
    }
}