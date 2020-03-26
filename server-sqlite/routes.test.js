/* eslint-disable arrow-body-style */
const request = require('supertest');
const { app, knex } = require('./routes');

const movie = {
  id: 135397,
  overview: 'Twenty-two years after ...',
  release_date: '2015-06-12',
  poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
  title: 'Jurassic World',
  vote_average: 6.9,
  rating: null,
  genre_ids: [12, 28, 53, 878],
};

describe('Film Explorer API', () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  // SuperTest has several helpful methods for conveniently testing responses
  // that we can use to make the tests more concise

  test('GET /api/films should return all movies (mostly SuperTest)', () => {
    return request(app)
      .get('/api/films')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([movie]);
  });

  test('PUT /api/films/:id should update the movie (mostly SuperTest)', () => {
    const newMovie = { ...movie, rating: 4 };
    return request(app)
      .put('/api/films/135397')
      .send(newMovie)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(newMovie);
  });

  test('PUT /api/films/:id should update the movie genres', () => {
    const newMovie = { ...movie, genre_ids: [12, 42] };
    return request(app)
      .put('/api/films/135397')
      .send(newMovie)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(newMovie);
  });

  test('GET /api/films/:id should return movie (mostly SuperTest)', () => {
    return request(app)
      .get(`/api/films/${movie.id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(movie);
  });
});
