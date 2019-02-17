# API User stories

The goal here is to describe the backend API through user stories.

## Non authenticated experience

### The user lands on the front page

A list of featured games are displayed.
The back should expose the following route `/games/featured`.
The route returns a list of featured games.

- `/games/featured` [GET]

```JSON
RESPONSE BODY
{
    games: [
        {
            icon,
            title,
            platform,
            description
        },
        ...
    ]
}
```

### The user wants to check out the list of all the games

He clicks on the `Games` button on the navbar, and lands on a page displaying the list of all games.
The back should expose the following route `/games` with the query parameter `:page`.

- `/games?page=:page`

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
            }
            ...
        ]
    }
```

### The user wants to check out a game

He clicks on a game (wherever in the site) and lands on the game's page. The page shows the information about the game, the comments, the saves.
The back should expose the following routes `/games/:id`, `/games/:id/comments`, `/games/:id/saves`.

- `/games/:id` [GET]

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

- `/games/:id/comments/:page` [GET]

 ```JSON
 RESPONSE BODY
    {
        page: 2,
        total_pages: 5,
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

- `/games/:id/saves/:page` [GET]

 ```JSON
RESPONSE BODY
    {
        page: 2,
        total_pages: 5,
        saves: [
            {
                name,
                author,
                author_id,
                download_link,
                date,
                completion,
                rating,
                description
            },
            ...
        ]
    }
 ```

### The user wants to check out another user

He clicks on a user (wherever in the site) and lands on the user's page. The page shows the information about the user, the games he's interested in and the corresponding saves.
The back should expose the following routes `/users/:id`, `/users/:id/games`.

- `/users/:id` [GET]

 ```JSON
 RESPONSE BODY
    {
        pseudo,
        avatar,
        bio,
        join_date
    }
 ```

- `/users/:id/games` [GET]

 ```JSON
RESPONSE BODY
    {
        page: 2,
        total_pages: 5,
        games: [
            {
                icon,
                title,
                platform,
                description,
                saves: [
                    {
                        name,
                        download_link,
                        date,
                        completion,
                        rating,
                        description
                    },
                    ...
                ]
            },
            ...
        ]
    }
```

### The user wants to sign up

The user wants to create an account.
The back should expose the following route `/register`.

- `/register` [POST]

```JSON
REQUEST BODY
    {
        mail,
        pseudo,
        password
    }
```

### Forgot Password

The user wants to retrieve his password, or get a magic link.
The back should expose the following route `/auth/reset`.

- `/auth/reset` [POST]

```JSON
REQUEST BODY
    {
        email
    }
```

## Authenticated experience

For all those user stories, the authentication token should be given with all POST requests.

### The user wants to log in

The user logs in the website
He fills the login form.

The back should expose the following route `/auth`.

- `/auth/` [POST]

```JSON
REQUEST BODY
    {
        email,
        password
    }
```

```JSON
RESPONSE BODY

    TOKEN
```

### The user wants to update his information

The user wants to edit his profile
Once the changes are done, he saves them.
The back should expose the following route `/user/:id/update/profile`.

- `/user/:id/update/profile` [POST]

```JSON
REQUEST BODY
    {
        pseudo,
        avatar,
        bio,
    }
```

### Delete account

The user wants to delete his account, to do so, he has to provide his mail and password.
The back should expose the following route.`/user/:id/delete`.

- `/user/:id/delete` [POST]

```JSON
REQUEST BODY
    {
        email,
        password
    }
```

### Update Password

The user wants to change his password.
To do so he has to provide his mail, old password and new password. The back should expose the following route `/user/:id/update/password`.

- `/user/:id/update/password` [POST]

```JSON
REQUEST BODY
    {
        email,
        old_password,
        new_password
    }
```

### Post Comment

The user wants to post a comment on a game. To do so he writes it and hist post.
The back should expose the following route `/games/:id/comments`.

- `/games/:id/comments` [POST]

```JSON
REQUEST BODY
    {
        comment,
    }
```

### Upload a save

The user wants to upload a save for a game.
The back should expose the following route `/games/:id/saves`.

- `/users/:id/saves` [POST]

```JSON
REQUEST BODY
    {
        data (base64)
    }
```

### Download a save

The user wants to download a save.
The back should expose the following route `/games/:id/saves`.

- `/games/:id/saves` [GET]

### Rate a game

The user wants to rate a game.
The back should expose the following route `/games/:id/ratings`.

- `/games/:id/ratings` [POST]

```JSON
REQUEST BODY
    {
        author_id,
        rating
    }
```

### Rate a save

The user wants to rate a save.
The back should expose the following route `/saves/:id/ratings`.

- `/saves/:id/ratings` [POST]

```JSON
REQUEST BODY
    {
        author_id,
        rating
    }
```

### Delete a save

The user wants to delete a save.
The back should expose the following route `/saves/:id/delete`.

- `/saves/:id/delete` [GET]

### Delete a comment

The user wants to delete a save.
The back should expose the following route `/comments/:id/delete`.

- `/comments/:id/delete` [GET]
