import React from 'react';
import './Header.css'

export default function Header() {
    return <div>
            <table className='headerBar'>
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
        </div>
}