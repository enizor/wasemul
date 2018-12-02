# wasemul

Sharing everything about games!

## Development

From scratch, use the following commands to build and up the docker-compose containers.

```bash
docker-compose -f docker-compose-dev.yml build --no-cache  # no-cache is optional, only use when you change package*.json files
docker-compose -f docker-compose-dev.yml up
```

These commands will expose the API from the `back` repo on port 3001, and the GUI from the `front` repo on port 3000.

The back is run with `nodemon`, so any changes you make should be reflected in real time.
