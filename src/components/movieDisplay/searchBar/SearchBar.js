import React from 'react';
import './search-bar.css';


export default function SearchBar(props){
    return(
        <div>
            <input type='text' placeholder='Enter search term...' onChange={(event) => props.handleSearchChange(event.target.value)} />

            <button className='searchButton' onClick={ () => props.submitSearch()} >Search</button>
        </div>
      )
}
