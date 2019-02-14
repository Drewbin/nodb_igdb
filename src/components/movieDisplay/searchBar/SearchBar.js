import React, {Component} from 'react';
import axios from 'axios';
import './search-bar.css';

export default class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchVal : '',
            searchList : [],
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    handleSearchChange(input) {
        this.setState({ searchVal : input });
    }

    submitSearch() {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ef6c1d08711de9897471cf423a857236&query=${this.state.searchVal}`).then(response => {
            this.setState({ searchList : response.data.results})
        }).catch((err) => {
            console.error(err);
        })
    }

  render(){
      return(
          <div>
              <input type='text' placeholder='Enter movie name...' onChange={(event) => this.handleSearchChange(event.target.value)} />
              
              <button className='searchButton' onClick={ () => this.submitSearch()} >Search</button>
          </div>
      )
  }
}