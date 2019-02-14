const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const {apiKey, apiUrl} = require('../config')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/current/movies', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=ef6c1d08711de9897471cf423a857236&primary_release_date.gte=2019-01-06&primary_release_date.lte=2019-02-14`).then(response => {
        res.status(200).json(response.data)
    }).catch((err) => {
        console.error(err)
    })
})

app.get(`/api/search/movies/:name`, (req, res,)=> {
    axios.get(`https://api.themoviedb.org/3/search/movie${apiKey}&query=${req.params.name}`).then(response=> {
      res.status(200).json(response.data);
    });
});

app.listen(3003, () =>{
    console.log('Server live on port 3003')
})