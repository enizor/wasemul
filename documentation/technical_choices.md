# Techincal Choices

## Database (PosgreSQL)

The deisgn thinking determined the main entities : `Game`, `User`, `Comment` and `Save`.
They are closely related and a relational databse seems indicated.
PostgreSQL was chosen because of our previous knowledge, against MongoDB, SQLite and MySQL

## Backend (NodeJS + express)

We chose NodeJS + express because we are comfortable with this technology, it allows a structured and clear code architecture. It has a big community which means that a lot of documentation and a lot of modules are available. Choosing NodeJS allows us to have a single stack application. 