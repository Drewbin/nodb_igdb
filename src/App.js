import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import MovieRow from './components/MovieRow/MovieRow'



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies : [],
    };


    this.getMovies()
  }

  getMovies(input) {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=ef6c1d08711de9897471cf423a857236&query=' + input).then((response) => {
      console.log(response);
      this.setState({movies : response })
    }).catch((err) => {
      console.error(err);
    })
  };
  
  searchChangeHandler(event) {
    console.log(event.target.value)
    const input = event.target.value
    this.getMovies(input)
  }

  render() {
    return (
      <div className="App">
        
        <table className='titleBar'>
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width='100' src="movie_reel.jpg" />
              </td>
              <td width='10' />
              <td>
                <h1>Movie Search</h1> 
              </td>
            </tr>
          </tbody>
        </table>

        <input 
          className='searchBox' 
          placeholder="Enter movie name"
          onChange={this.searchChangeHandler.bind(this)} />

        {this.state.id}
        
      </div>
    );
  }
}

export default App;


// api key: ef6c1d08711de9897471cf423a857236

// sample request: https://api.themoviedb.org/3/movie/550?api_key=ef6c1d08711de9897471cf423a857236








