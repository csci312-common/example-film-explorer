# Film Explorer Top-level

This repository combines the Film Explorer client and servers into a single repository that can be co-developed, tested and ultimately deployed to Heroku.

The client was created with [create-react-app](https://github.com/facebookincubator/create-react-app) (CRA) and the server is a separate Node.js application. The client-server integration is based on this [tutorial](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) and [repository](https://github.com/fullstackreact/food-lookup-demo). This repository will be referred to as the "top-level" to distinguish it from the client and server.

## Running the Application

The combined application, client and server, can be run with `npm run start:[memory,mongodb,sqlite]`, e.g. `npm run start:memory`, in the top-level directory. `npm run start:[memory,mongodb,sqlite]` launches the client development server on http://localhost:3000 and the specified server on http://localhost:3001 (one of memory, mongo, sqlite). By setting the `proxy` field in the client `package.json`, the client development server will proxy any unrecognized requests to the server.

*Note* that for the MongoDB-backed server you need to have started the MongoDB database in another terminal window with `npm run mongo --prefix server-mongodb` (executed in the top-level directory) before executing `npm run start:mongo`.

## Testing

The client application can be independently tested as described in the [CRA documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests), i.e.:

```
npm test --prefix client
```

Some of the server applications also have test suites that can be run independently, e.g. `npm test --prefix server-sqlite`. See the specific server README for any setup that may be required.

## Linting

To ensure consistent style we use the CRA-recommended [Prettier](https://github.com/prettier/prettier) package. We installed it with

```
npm install --save-dev husky lint-staged prettier
```

and added the recommended configuration to automatically reformat code during the commit. That is whenever you commit your code, Prettier will automatically reformat your code during the commit process (as a "hook"). The hook is specified in the top-level `package.json` file. The client and each of the servers has its own ESLint configuration.

## Deploying to Heroku

The Film Explorer can be deployed to [Heroku](heroku.com) using the approach demonstrated in this [repository](https://github.com/mars/heroku-cra-node). The current configuration deploys the MongoDB-backed server. The key additions to the top-level `package.json` file to enable Heroku deployment:

* Specify the node version in the `engines` field
* Add a `heroku-postbuild` script field that will install dependencies for the client and server and create the production build of the client application.
* Specify that `node_modules` should be cached to optimize build time

In addition a `Procfile` was added in the top-level package to start the server.

Assuming that you have a Heroku account, have installed the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli) and committed any changes to the application, to deploy to Heroku:

1. Create the Heroku app, e.g.:

    ```
    heroku apps:create
    heroku addons:create mongolab:sandbox
    ```

1. Seed the database. You will need the `MONGODB_URI` from `heroku config`.

    ```
    mongoimport --collection movies --jsonArray movies.json --uri="$MONGODB_URI"
    ```

1. Push to Heroku

    ```
    git push heroku master
    ```

## Deploying to Basin

The Film Explorer can be deployed to basin (where it is typically run within `screen`). The current configuration deploys the sqlite-backed server.

1. Create and seed the database from with `server-sqlite`:

    ```
    npx knex migrate:latest
    npx knex seed:run
    ```

1. Start the server from the top-level directory

	```
	NODE_ENV=production PORT=5042 npm run start --prefix server-sqlite
	```
