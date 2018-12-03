# Technical Choices

## Database (PosgreSQL)

The design thinking determined the main entities : `Game`, `User`, `Comment` and `Save`.
They are closely related and a relational databse seems indicated.
PostgreSQL was chosen because of our previous knowledge, against MongoDB, SQLite and MySQL

## Backend (NodeJS + express)

We chose NodeJS + express because we are comfortable with this technology, it allows a structured and clear code architecture. It has a big community which means that a lot of documentation and a lot of modules are available. Choosing NodeJS allows us to have a single stack application.

## Frontend (React)

React has proved its worth as simple yet powerful framework. Collaboration is made easy with the components, and some of us are already familiar with this technology.

## Containers (Docker)

Docker allows us to separate the different services and prove their independance, as well as providing an replicable way of deploying them. Furthermore, we already have worked a lot with Docker already have the necessary skills involved.

## Server/Proxy (NGINX)

A reverse proxy will allow us to simply serve the static files and provide easily the HTTPS layer to secure our website. It could all have been configured in the Node server, but it would be both cleaner and easier to extend in a dedicated server that we are already familiar with.

## Let's Encrypt

[Let's Encrypt](https://letsencrypt.org/) is a certificate authority that provides free TLS certificates. Certificate management on UNIX-like OSs is further simplified by using the [certbot](https://certbot.eff.org/) tool.

This will allow us to easily provide encrypted HTTPS connections to our service.

## ORM (Sequelize)

Le débat pour le choix de l'ORM fut mouvementé. Après recherche, 4 ont été considérés:
- sequelize: connu de certains d'entre nous, mais beaucoup de retours négatifs de la part de nos connaissances l'ayant utilisé amplement. 
- loopback: Plus qu'un ORM, c'est un framework complet et nous tenons à Express.
- node-postgres: Pas totalement un ORM, il faut écrire les requêtes à la main.
- TypeORM : orienté Typescript, il possède très peu de documentation javascript.

Nous nous sommes rabattu sur Sequelize, en déterminant que ses inconvénients seront peu rencontrés car notre base de données reste petite, avec peu de tables.
