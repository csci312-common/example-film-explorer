/* eslint-disable no-console */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Resolve client build directory as absolute path to avoid errors in express
  const buildPath = path.resolve(__dirname, '../client/build');

  app.use(express.static(buildPath));

  app.get('/', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Allow cross-origin request
const corsOptions = {
  methods: ['GET', 'PUT', 'POST'],
  origin: '*',
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

let movies;
const cleanMovies = new Map();

app.get('/api/movies', (request, response) => {
  response.send(Array.from(movies.values()));
});

app.get('/api/movies/:id', (request, response) => {
  response.send(movies.get(request.params.id));
});

app.put('/api/movies/:id', (request, response) => {
  const movieId = parseInt(request.params.id, 10);
  const newMovie = request.body;
  if (newMovie.id && newMovie.id === movieId && movies.get(movieId)) {
    const mergedMovie = Object.assign({}, movies.get(movieId), newMovie);
    movies.set(mergedMovie.id, mergedMovie);
    response.send(mergedMovie);
  } else {
    console.error(`Received bad movie item [${movieId}]`);
    console.error(request.body);
    response.status(500).send({ error: 'Invalid movie object received' });
  }
});

// Load movie data before starting the server
// path.join automatically inserts correct file separator
fs.readFile(path.join(__dirname, 'movies.json'), (err, contents) => {
  const data = JSON.parse(contents);
  data.forEach(movie => {
    cleanMovies.set(movie.id, movie);
  });
  movies = new Map(cleanMovies);
  // reset the movie collection periodically
  setInterval(() => {
    movies = new Map(cleanMovies);
  }, 300000); // reset the movies every five minutes

  // Don't start server until data loaded
  // We create the server explicitly (instead of using app.listen()) to
  // provide an example of how we would create a https server
  const server = http.createServer(app).listen(process.env.PORT || 3001, () => {
    console.log('Listening on port %d', server.address().port);
  });
});
