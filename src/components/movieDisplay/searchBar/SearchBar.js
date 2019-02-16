import React from 'react';
import './search-bar.css';


export default function SearchBar(props){
    return(
        <div>
            <input type='text' 
                   placeholder='Enter movie title...' 
                   onChange={(event) => props.handleSearchChange(event.target.value)} 
                   onKeyPress={(e) => {if (e.charCode == 13) {
                       props.submitSearch();
                    }}} />

            <button className='searchButton' onClick={ () => props.submitSearch()} > Search </button>
        </div>
      )
}
