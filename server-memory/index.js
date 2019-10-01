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

let films;
const cleanfilms = new Map();

app.get('/api/films', (request, response) => {
  response.send(Array.from(films.values()));
});

app.get('/api/films/:id', (request, response) => {
  response.send(films.get(request.params.id));
});

app.put('/api/films/:id', (request, response) => {
  const filmId = parseInt(request.params.id, 10);
  const newfilm = request.body;
  if (newfilm.id && newfilm.id === filmId && films.get(filmId)) {
    const mergedfilm = Object.assign({}, films.get(filmId), newfilm);
    films.set(mergedfilm.id, mergedfilm);
    response.send(mergedfilm);
  } else {
    console.error(`Received bad film item [${filmId}]`);
    console.error(request.body);
    response.status(500).send({ error: 'Invalid film object received' });
  }
});

// Load film data before starting the server
// path.join automatically inserts correct file separator
fs.readFile(path.join(__dirname, 'films.json'), (err, contents) => {
  const data = JSON.parse(contents);
  data.forEach(film => {
    cleanfilms.set(film.id, film);
  });
  films = new Map(cleanfilms);
  // reset the film collection periodically
  setInterval(() => {
    films = new Map(cleanfilms);
  }, 300000); // reset the films every five minutes

  // Don't start server until data loaded
  // We create the server explicitly (instead of using app.listen()) to
  // provide an example of how we would create a https server
  const server = http.createServer(app).listen(process.env.PORT || 3001, () => {
    console.log('Listening on port %d', server.address().port);
  });
});
