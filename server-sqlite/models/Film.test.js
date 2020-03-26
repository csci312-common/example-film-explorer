/* eslint-disable arrow-body-style */
const knexConfig = require('../knexfile'); // eslint-disable-line
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'test']);
const Film = require('./Film');
const Genre = require('./Genre');

const film = {
  id: 135397,
  overview: 'Twenty-two years after ...',
  release_date: '2015-06-12',
  poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
  title: 'Jurassic World',
  vote_average: 6.9,
  rating: null,
  genre_ids: [12, 28, 53, 878],
};

describe('FilmExplorer Film Model', () => {
  test('Model translates genre_ids to Genres and back again', () => {
    const modelFilm = Film.fromJson(film);
    expect(modelFilm).toHaveProperty(
      'genres',
      expect.arrayContaining(
        film.genre_ids.map((genreId) => ({ genreId, filmId: film.id }))
      )
    );
    expect(modelFilm.toJSON()).toEqual(film);
  });

  describe('Film Explorer Film Schema', () => {
    beforeEach(() => {
      return knex.migrate
        .rollback()
        .then(() => knex.migrate.latest())
        .then(() => knex.seed.run());
    });

    test('Deleting Films deletes Genres', () => {
      return Genre.query()
        .then((genres) => {
          expect(genres).not.toHaveLength(0);
          return Film.query().delete();
        })
        .then((numDeleted) => {
          expect(numDeleted).toBe(1);
          return Genre.query();
        })
        .then((genres) => {
          expect(genres).toHaveLength(0);
        });
    });

    afterEach(() => {
      return knex.migrate.rollback();
    });
  });
});
