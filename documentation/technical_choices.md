# Technical Choices

## Database (PosgreSQL)

The design thinking determined the main entities : `Game`, `User`, `Comment` and `Save`.
They are closely related and a relational databse seems indicated.
PostgreSQL was chosen because of our previous knowledge, against MongoDB, SQLite and MySQL

## Backend (NodeJS + express)

We chose NodeJS + express because we are comfortable with this technology, it allows a structured and clear code architecture. It has a big community which means that a lot of documentation and a lot of modules are available. Choosing NodeJS allows us to have a single stack application.

## Server/Proxy (NGINX)

A reverse proxy will allow us to simply serve the static files and provide easily the HTTPS layer to secure our website. It could all have been configured in the Node server, but it would be both cleaner and easier to extend in a dedicated server that we are already familiar with.

## Let's Encrypt

[Let's Encrypt](https://letsencrypt.org/) is a certificate authority that provides free TLS certificates. Certificate management on UNIX-like OSs is further simplified by using the [certbot](https://certbot.eff.org/) tool.

This will allow us to easily provide encrypted HTTPS connections to our service.
