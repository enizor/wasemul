# Technical Choices

## Database (PosgreSQL)

The design thinking determined the main entities : `Game`, `User`, `Comment` and `Save`.
They are closely related and a relational databse seems indicated.
PostgreSQL was chosen because of our previous knowledge, against MongoDB, SQLite and MySQL

## Backend (NodeJS + express)

We chose NodeJS + express because we are comfortable with this technology, it allows a structured and clear code architecture. It has a big community which means that a lot of documentation and a lot of modules are available. Choosing NodeJS allows us to have a single stack application.

## Frontend (React)

React has proved its worth as a simple yet powerful framework. Collaboration is made easy with the components, and some of us are already familiar with this technology.

## Containers (Docker)

Docker allows us to separate the different services and prove their independance, as well as providing an replicable way of deploying them. Furthermore, we already have worked a lot with Docker already have the necessary skills involved.

## Server/Proxy (NGINX)

A reverse proxy will allow us to simply serve the static files and provide easily the HTTPS layer to secure our website. It could all have been configured in the Node server, but it would be both cleaner and easier to extend in a dedicated server that we are already familiar with.

## Let's Encrypt

[Let's Encrypt](https://letsencrypt.org/) is a certificate authority that provides free TLS certificates. Certificate management on UNIX-like OSs is further simplified by using the [certbot](https://certbot.eff.org/) tool.

This will allow us to easily provide encrypted HTTPS connections to our service.

## ORM (Sequelize)

After a long discussion to choose the ORM, we listed 4 possibilities
- sequelize: Known by some of us, but we got a lot of negative feedback from some friends.
- loopback: Very heavy framework that exceeds our scope.
- node-postgres: Not a full-fledged ORM, we need to create the SQL queries by hand.
- TypeORM : Typescript-oriented, has almost no Javascript documentation.

We chose to fall back on Sequelize, determining that its drawbacks will be rarely encountered.

## Testing framework (Jest)

Jest is an extensive JS testing framework, that will be used by both the back and the front. It is already included in `create-react-app` and particurlarly convenient here.
