const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const {apiKey, apiUrl} = require('../config')

const app = express();

const favoriteMovies = [];

app.use(cors());
app.use(bodyParser.json());


app.get('/api/current/movies', (req, res) => {
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=ef6c1d08711de9897471cf423a857236&primary_release_date.gte=2019-01-10&primary_release_date.lte=2019-02-16').then(response => {
        console.log(response)
        res.status(200).send(response.data)
    }).catch((err) => {
        console.error(err)
    })
})


app.get(`/api/search/movies/:name`, (req, res,)=> {
    axios.get(`https://api.themoviedb.org/3/search/movie${apiKey}&query=${req.params.name}`).then(response=> {
      res.status(200).send(response.data);
    });
});


app.get('/api/favorite/movies', (req, res) => {
    res.send(favoriteMovies)
})


app.post('/api/favorite/movies', (req, res) => {
    const favoriteId = req.body.id;
    
    if (favoriteMovies.includes(favoriteId)) {
        return res.status(400).send({message: 'ID already exists'});
    }
    favoriteMovies.push(favoriteId);
    res.status(201).send(favoriteMovies)
});

app.put('/api/favorite/movies/:id', (req,res) => {
    const update = req.body;
    const { id } = req.params;

    const oldMovieIndex = favoriteMovies.findIndex( mov => mov.id == id);

    if (oldMovieIndex == -1 ) {
        return res.status(404).send({ message: 'No movie found with id ' + id });
    }

    favoriteMovies[oldMovieIndex] = {
        ...favoriteMovies[oldMovieIndex],
        ...update,
    };

    res.send(favoriteMovies);
})


app.delete(`/api/favorite/movies/:id`, (req, res) =>{
    const favoriteId = +req.params.id;
    const favoriteIdIndex = favoriteMovies.indexOf(favoriteId);

    favoriteMovies.splice(favoriteIdIndex, 1);

    res.send(favoriteMovies);
})




app.listen(3003, () =>{
    console.log('Server live on port 3003')
})