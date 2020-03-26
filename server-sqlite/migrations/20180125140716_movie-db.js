/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.up = function (knex) {
  return knex.schema
    .createTable('Film', (table) => {
      table.integer('id').unsigned().primary();
      table.text('overview');
      table.string('release_date');
      table.string('poster_path');
      table.string('title');
      table.float('vote_average');
      table.integer('rating');
    })
    .createTable('Genre', (table) => {
      table
        .integer('filmId')
        .unsigned()
        .references('id')
        .inTable('Film')
        .onDelete('CASCADE');
      table.integer('genreId');
      table.primary(['filmId', 'genreId']);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Genre').dropTableIfExists('Film');
};
