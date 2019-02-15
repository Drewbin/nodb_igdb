import React, { Component } from 'react';
//import axios from 'axios';
import './App.css';

import Header from './components/Header/Header';
import MovieDisplay from './components/movieDisplay/MovieDisplay'
class App extends Component {
  constructor() {
    super();

    this.state = {
      movieList : [],
    }
  }



  render() {
    console.log(this.state.movieList)
    return (
      <div className="App">
        <Header />
        <MovieDisplay />
      </div>
    );
  }
}

export default App;


//apiUrl: 'https://api.themoviedb.org/3',
//apiKey: '?api_key=ef6c1d08711de9897471cf423a857236'