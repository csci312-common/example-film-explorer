# RDBMS-backed Film Explorer Server

A server for the CS312 film-explorer example backed by a RDBMS (e.g. sqlite3). This server demonstrates the use of an ORM, [Objection.js](http://vincit.github.io/objection.js/) with associations.

The multiple genres for a film are represented as a HasMany relation to the `Genre` table. The corresponding names for the genres can be found in the `genres.json` file. The JSON parsing methods are overridden to maintain the same `genre_ids` array-based interface as in the source JSON file (and as would be returned by the MongoDB server).

The movie data was sourced from [themoviedb](https://www.themoviedb.org).

## Running

Launch server with `npm run start`. By default the application is available at <http://localhost:3001>. Alternately launch the server with `npm run watch` to automatically restart the server when any files change.

## Setup

Run `npm install` to install the dependencies. To create the database run the included migration:

```
npx knex migrate:latest
```

The repository includes some sample data to seed the database. To do so, run the included seed script:

```
npx knex seed:run
```

## Development

### Testing with Jest and Supertest

A basic test suite is included (run with `npm test`). A separate test database is used, along with a minimal seed. Note that Jest automatically sets `NODE_ENV=test`.

### Linting with ESLint

The server is configured with the aggressive [AirBnB ESLint rules](https://github.com/airbnb/javascript). These rules were installed with:

```
npx install-peerdeps --dev eslint-config-airbnb-base
```

and then `esling-config-prettier` package to disable the style rules that conflict with [Prettier](https://prettier.io)

```
npm install --save-dev eslint-config-prettier
```

and `.eslintrc.json` is configured with:

```
{
  "extends": ["airbnb-base", "prettier"]
}
```

The linter can be run with `npx eslint .` (or via `npm run lint`). Include the `--fix` option to `eslint` to automatically fix many formatting errors.
