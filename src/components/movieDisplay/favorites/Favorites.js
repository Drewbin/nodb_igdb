import React from 'react';

export default function Favorites(props) {
    return(
        <div>
            <button onClick={ () => props.addToFavorites()} >💖</button>
        </div>
    )
}