/* eslint-disable func-names, camelcase */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const { Model, transaction } = require('objection');
const Film = require('../../models/Film');

exports.seed = function (knex) {
  // Bind all Models to a knex instance
  Model.knex(knex);

  // Deletes ALL existing entries
  /* eslint-disable arrow-body-style */
  return Promise.all([knex('Film').del(), knex('Genre').del()]).then(() => {
    // Insert the graph as a single transaction
    return transaction(Film.knex(), (trx) =>
      Film.query(trx).insertGraph({
        id: 135397,
        overview: 'Twenty-two years after ...',
        release_date: '2015-06-12',
        poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
        title: 'Jurassic World',
        vote_average: 6.9,
        genre_ids: [12, 28, 53, 878],
      })
    );
  });
};
