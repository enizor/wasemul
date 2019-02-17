# API description

This document describes the various ressources made available by the backend API.

## Public routes

These routes are available to anyone.

* `/games` (GET): returns a JSON object containing all games (in a paginated fashion)
  * `/games/featured` (GET): return a JSON object containing featured games
  * `/games/:id` (GET): return a JSON object containing a game (based on its database `id`)
  * `/games/:id` (GET): return a JSON object containing the comments related to a game (based on the game's database `id`)
* `/users` (GET): returns a JSON object containing all users
  * `/users/:id` (GET): returns a JSON object containing a user (based on its database `id`)
  * `/users/:id/comments` (GET): returns a JSON object containing the comments posted by a user (based on the user's database `id`)
* `/comments` (GET): returns a JSON object containing all comments
  * `/comments/:id` (GET): return a JSON object containing a comment (based on its database `id`)
* `/search` (GET): returns a JSON object containing the users and games matching the search terms

* `/auth` (POST): allows user authentification; returns a signed JSON Web Token (if successful)
* `/register` (POST): allows user creation,  by creating a new user (in database); returns a signed JSON Web Token (if successful)

## Protected routes

These routes require authentification. Some of these routes may require a specific privilege level (such as `admin`).

* `/games` (POST): allows game creation; returns a JSON object containing the newly created game (if successful)
  * `/games/:id` (PUT): allows updating the data related to a game (selected by its database `id`); returns a JSON object containing the updated game (if successful)
   `/games/:id/comments` (POST): allows creation of a new comment related to a game (selected by its database `id`); returns a JSON object containing the newly created comment (if successful)
* `/users`
  * `/users/:id` (PUT): allows updating a user (selected by its database `id`); returns a JSON object containing the updated user (if successful)


## Development-only routes

These routes are available only in a development environment (this is determined by the `docker-compose` file used).

* `/seed` (GET): seed the database with sample data
