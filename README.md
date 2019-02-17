# wasemul

Sharing everything about games!

## Development

From scratch, use the following commands to build and run the docker-compose containers.

Don't forget to add the database name, user and password to the environment variables of the db container (in `docker-compose-dev.yml`). Do not forget to also add them to `back/.env` so that the backend app can connect to the database.

```bash
./npm_install.sh # Installs node_modules required for development
docker-compose -f docker-compose-dev.yml build --no-cache  # no-cache is optional, only use when you change package*.json files
docker-compose -f docker-compose-dev.yml up
```

These commands will expose the API from the `back` repo on port 3002, and the GUI from the `front` repo on port 3000.

Once the containers are running, seed the database by accessing route `/seed` of the back repo (through any web browser). The URL will typically be <http://localhost:3002/seed>.

The back is run with `nodemon`, so any changes you make should be reflected in real time.

### Running the test suites

Test suites are run automatically when committing with `git`.

To run the test suites manually :

* for the back repo, go to the `back/` directory and run:

  ```bash
  npm test && npm run test-format
  ```

* for the front repo, go to the `front/` directory and run:

  ```bash
  CI=true npm test && npm run test-format
  ```

## Production deployment

The service is currently available at [wasemul.viarezo.fr](https://wasemul.viarezo.fr/).
