# API description

This document describes the various ressources made available by the backend API.

## Public routes

These routes are available to anyone.

### Games

- `/games?page=:page` [GET]: returns a JSON object containing all games (in a paginated fashion)

  ```JSON
  RESPONSE BODY
  {
    page,
    pages,
    games: [
      {
        id,
        icon,
        title,
        developer,
        release_date
      },
      ...
    ]
  }
  ```

- `/games/featured` [GET] returns a list of featured games

  ```JSON
  RESPONSE BODY
  {
    games: [
      {
        icon,
        title,
        platform,
        descripton
      },
      ...
    ]
  }
  ```

- `/games/:id` [GET]: return a JSON object containing a game (based on its database `id`)

  ```JSON
  RESPONSE BODY
  {
    icon,
    title,
    description,
    platform,
    rating,
    version,
    year,
    developer
  }
  ```

- `/games/:id/comments?page=:page` [GET]: return a JSON object containing the comments related to a game (based on the game's database `id`)

  ```JSON
  RESPONSE BODY
  {
    page,
    total_pages,
    comments: [
      {
        author,
        author_id,
        date,
        body
      },
      ...
    ]
  }
  ```

- `/games/:id/saves?page=:page` [GET]: return a JSON object containing the comments related to a game (based on the game's database `id`)

  ```JSON
  REQUEST BODY
  [
    page,
    total_pages,
    saves: {
      id,
      file,
      uploadTimestamp,
      enabled,
      createdAt,
      updatedAt,
      userId,
      gameId,
      User {
        nickname
      }
    },
    ...
  ]
  ```

### Users

- `/users` [GET]: returns a JSON object containing all users

  ```JSON
  RESPONSE BODY
  [
    {
      id,
      nickname,
      password,
      email,
      authLevel,
      biography,
      icon,
      enabled,
      createdAt,
      updatedAt
    },
    ...
  ]
  ```

  - `/users/:id` [GET]: returns a JSON object containing a user (based on its database `id`)

    ```JSON
    RESPONSE BODY
    {
      id,
      nickname,
      password,
      email,
      authLevel,
      biography,
      icon,
      enabled,
      createdAt,
      updatedAt
    }
    ```

  - `/users/:id/comments` [GET]: returns a JSON object containing the comments posted by a user (based on the user's database `id`)

  ```JSON
  RESPONSE BODY
  [
    {
      id,
      body,
      enabled,
      createdAt,
      updatedAt,
      userId,
      gameId
    },
    ...
  ]
  ```

- `/comments` [GET]: returns a JSON object containing all comments

  ```JSON
  RESPONSE BODY
  [
    {
      id,
      body,
      enabled,
      createdAt,
      updatedAt,
      userId,
      gameId
    },
    ...
  ]
  ```

  - `/comments/:id` [GET]: return a JSON object containing a comment (based on its database `id`)

    ```JSON
    RESPONSE BODY
    [
      {
        id,
        body,
        enabled,
        createdAt,
        updatedAt,
        userId,
        gameId
      }
    ]
    ```

- `/search` [GET]: returns a JSON object containing the users and games matching the search terms

  ```JSON
  RESPONSE BODY
  {
    games:
    [
      {
        id,
        name,
        platform,
        description,
        icon,
        releaseDate,
        publisher,
        version,
        enabled,
        createdAt,
        updatedAt
      },
      ...
    ],
    users:
    [
      {
        id,
        nickname,
        password,
        email,
        authLevel,
        biography,
        icon,
        enabled,
        createdAt,
        updatedAt
      },
      ...
    ]
  }

- `/auth` [POST]: allows user authentification; returns a signed JSON Web Token (if successful)
- `/register` [POST]: allows user creation,  by creating a new user (in database); returns a signed JSON Web Token (if successful)

## Protected routes

These routes require authentification. Some of these routes may require a specific privilege level (such as `admin`). The JSON Web TOken should be placed in the "Authentication" header.



- `/games` [POST]: allows game creation; returns a JSON object containing the newly created game (if successful)
  - `/games/:id` [PUT]: allows updating the data related to a game (selected by its database `id`); returns a JSON object containing the updated game (if successful)
   `/games/:id/comments` [POST]: allows creation of a new comment related to a game (selected by its database `id`); returns a JSON object containing the newly created comment (if successful)
- `/users`
  - `/users/:id` [PUT]: allows updating a user (selected by its database `id`); returns a JSON object containing the updated user (if successful)

## Development-only routes

These routes are available only in a development environment (this is determined by the `docker-compose` file used).

- `/seed` [GET]: seed the database with sample data; returns a JSON object containing a text message (`'Database seeded!'`)
