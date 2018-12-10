# API User stories

The goal here is to describe the backend API through user stories.

## Non authenticated experience

### The user lands on the front page.

A list of featured games are displayed. 
The back should expose the following route `/games/featured`.
The route returns a list of featured games.

- `/games/geatured` [GET]
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

### The user wants to check out a game.

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
        developper
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
                descripton,
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

## Authenticated experience

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
RESPONSE DATA

    TOKEN
```

### The user wants to update his information

The user wants to edit his profile
Once the changes are done, he saves them.
The back should expose the following route `/user/:id/update`.

- `/user/:id/update` [POST]
```JSON
REQUEST BODY
    {
        pseudo,
        avatar,
        bio,
    }
```

### Delete account

### Update Password

### Post Comment

### Rate a game

### Rate a save

### Delete a save

### Delete a comment