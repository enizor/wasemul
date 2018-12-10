# wasemul

Sharing everything about games!

## Development

From scratch, use the following commands to build and up the docker-compose containers.

Don't forget to add the database name, user and password to
the environment variables of the db container (in `docker-compose-dev.yml`). Do not forget to also add them to `back/.env` so that the backend app can connect to the database.

```bash
./npm_install.sh # Installs node_modules for all projects
docker-compose -f docker-compose-dev.yml build --no-cache  # no-cache is optional, only use when you change package*.json files
docker-compose -f docker-compose-dev.yml up
```

These commands will expose the API from the `back` repo on port 3001, and the GUI from the `front` repo on port 3000.

The back is run with `nodemon`, so any changes you make should be reflected in real time.
