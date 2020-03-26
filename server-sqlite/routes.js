/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('express-promise-router')();

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);

const { Model } = require('objection');
const Film = require('./models/Film');

// Bind all Models to a knex instance.
Model.knex(knex);

const app = express();

// express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Resolve client build directory as absolute path to avoid errors in express
  const path = require('path'); // eslint-disable-line global-require
  const buildPath = path.resolve(__dirname, '../client/build');

  app.use(express.static(buildPath));

  app.get('/', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Allow cross-origin requests
const corsOptions = {
  methods: ['GET', 'PUT', 'POST'],
  origin: '*',
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(router); // Use express-promise-router

// express-promise-router enables us to return a Promise in a route handler.
// If that Promise is rejected the error handling middleware will be invoked.

// A very simple error handler. In a production setting you would not want to send
// information about the inner workings of your application or database to the requester.
app.use((error, request, response, next) => {
  if (response.headersSent) {
    next(error);
  }
  response
    .status(error.statusCode || error.status || 500)
    .send(error.data || error.message || {});
});

router.get('/api/films', (request, response) => {
  // With almost any kind of related we want to take advantage of the ORM's capabilities
  // to fetch all the data in "one shot". Here we tell objection to fetch the films and
  // all of the associated genres. With this "eager" queries you can early reconstruct
  // complex objects from your database tables in one action.

  // eslint-disable-line arrow-body-style
  return Film.query()
    .withGraphFetched('genres')
    .then((movies) => {
      response.send(movies);
    });
});

router.get('/api/films/:id', (request, response) => {
  // eslint-disable-line arrow-body-style
  return Film.query()
    .findById(request.params.id)
    .withGraphFetched('genres')
    .then((movie) => {
      response.send(movie);
    });
});

// Use upsertGraphAndFetch to update genres when updating movie
router.put('/api/films/:id', (request, response, next) => {
  const updatedFilm = { ...request.body, id: parseInt(request.params.id, 10) };
  return Film.query()
    .upsertGraphAndFetch(updatedFilm, { insertMissing: true })
    .then((movie) => {
      response.send(movie);
    });
});

module.exports = {
  app,
  knex,
};
