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

* `/auth` (POST): allows user authentification, by returning a signed JSON Web Token (if successful)
* `/register` (POST): allows user creation,  by creating a new user (in database) and returning a signed JSON Web Token (if successful)

## Protected routes

These routes require authentification. Some of these routes may require a specific privilege level (such as `admin`).

## Development-only routes

These routes are available only in a development environment (this is determined by the `docker-compose` file used).

* `/seed` (GET): seed the database with sample data
