const express = require('express');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json());

let movies = [];

app.post('/create', (req, res) => {
    if(movies.length == 0){
        movies.push(req.body);
    }
    res.status(200).send(movies)
})

app.delete('/remove:id', (req,res) => {
    let {id} = req.params;
    movies.splice(id, 1);
    res.status(200).send(movies)
})

app.put('/update/:id', (req, res) => {
    console.log(req.body, req.params)
    let {id} = req.params;
    if(movies.length == 1) {
        movies[0] = req.body;
    };
    res.status(200).send(movies)
})

app.listen(3002, () => {
    console.log('App live at localhost: 3002')
})