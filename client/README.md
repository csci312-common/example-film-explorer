# Film Explorer client

The film-explorer client was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) (CRA) and includes all of capabilities provided by CRA. Some built-in functionality of that skeleton was stripped out, specifically the [offline caching](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app).

## Setup

Run `npm install` to install the dependencies.

The development server will attempt to proxy API requests to the server specified in the `package.json` "proxy" field. Update that field to point a running server.

## Development

### Testing

The tests use both Jest and Enzyme has described in the [CRA documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests).

Enzyme was installed with:

```
npm install --save-dev enzyme enzyme-adapter-react-16 react-test-renderer
```

### Linting with ESLint

We utilize the ESLint configuration built into CRA (which is more permissive than the AirBnB configuration). The linter is run automatically by the CRA development server, or can be run manually with `npm run lint`.

The AirBnB rules do not integrate smoothly with the current version of CRA. Thus we have added our own rules to `.eslintrc.json`. Thus you will get a different, and more expansive set of warnings and errors, when you run `npm run lint` than with the output provided by the CRA development server.

The linter is run automatically by the CRA development server, or can be run manually with `npx eslint src` (or via `npm run lint`). Include the `--fix` option to `eslint` to automatically fix many formatting errors.
