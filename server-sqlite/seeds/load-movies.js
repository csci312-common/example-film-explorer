/* eslint-disable func-names, camelcase */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require('fs');
const { Model, transaction } = require('objection');
const Film = require('../models/Film');

const contents = fs.readFileSync('films.json');
const data = JSON.parse(contents);

exports.seed = function (knex) {
  // Bind all Models to a knex instance
  Model.knex(knex);

  // Deletes ALL existing entries
  return Promise.all([knex('Film').del(), knex('Genre').del()]).then(() => {
    // Inserts seed entries (filtering for only desired properties)
    const graph = data.map((film) => {
      const {
        id,
        overview,
        release_date,
        poster_path,
        title,
        vote_average,
        genre_ids,
      } = film;
      // The genres properties creates the corresponding entries for the
      // HasMany relation
      return {
        id,
        overview,
        release_date,
        poster_path,
        title,
        vote_average,
        genre_ids,
      };
    });
    // Insert the graph as a single transaction
    return transaction(Film.knex(), (trx) =>
      Film.query(trx).insertGraph(graph)
    );
  });
};
