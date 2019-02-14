/* eslint-disable no-console */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import path from 'path';
import jsonwebtoken from 'jsonwebtoken';
import dbController from './models/dbController';
import seedDb from './models/seedDb';
import { comparePassword, hashPassword } from './auth';

const app = express();
const port = 3002;

app.use(cors());

// Parse application/json
app.use(bodyParser.json());

app.use(cors());

dotenv.load();

const { db, sequelize, op } = dbController();

sequelize.sync();

if (process.env.NODE_ENV === 'development') {
  // Show better errors in development
  app.use(errorHandler());

  // Log http accesses
  app.use(morgan('dev'));

  // Seed database
  app.get('/seed', async (_, res) => {
    await seedDb(db, sequelize);
    res.send('Database seeded!');
  });
}

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => {
  res.send('Hello world!');
});

app.get('/games/:id/comments', (req, res) => {
  db.Game.findOne({ where: { id: req.params.id } }).then((game) => {
    game
      .getComments({
        include: [{ model: db.User, attributes: ['nickname'] }],
      })
      .then((comments) => {
        res.send(comments);
      });
  });
});

app.get('/games/featured', (_, res) => {
  db.Game.findAll({ limit: 10 }).then((games) => {
    res.send(games);
  });
});

app.put('/games/:id', (req, res) => {
  const token = jsonwebtoken.verify(req.headers.authorization,
    process.env.JWT_KEY);
  db.User.findOne({ where: { id: token.id } })
    .then((modifyingUser) => {
      if (modifyingUser && modifyingUser.authLevel !== 2) {
        db.Game.findOne({ where: { id: req.params.id } })
          .then(game => game.update({
            name: req.body.game.name,
            platform: req.body.game.platform,
            description: req.body.game.description,
            publisher: req.body.game.publisher,
          }))
          .then((updatedGame) => {
            if (updatedGame) {
              res.send(updatedGame);
            } else {
              res.sendStatus(500);
            }
          });
      } else {
        res.sendStatus(403);
      }
    })
    .catch(() => res.sendStatus(403));
});

app.post('/games', async (req, res) => {
  const token = jsonwebtoken.verify(req.headers.authorization,
    process.env.JWT_KEY);
  const modifyingUser = await db.User.findOne({ where: { id: token.id } });
  if (modifyingUser && modifyingUser.authLevel !== 2) {
    const newGame = await db.Game.create({
      name: req.body.game.name,
      platform: req.body.game.platform,
      description: req.body.game.description,
      publisher: req.body.game.publisher,
    });
    if (newGame) {
      res.send(newGame);
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});

app.get('/games/:id', (req, res) => {
  db.Game.findOne({ where: { id: req.params.id } }).then((game) => {
    res.send(game);
  });
});

app.get('/games', (req, res) => {
  const limit = 10;
  let offset = 0;
  db.Game.findAndCountAll().then((data) => {
    const page = req.query.page || 1;
    const pages = Math.ceil(data.count / limit);
    offset = limit * (page - 1);
    db.Game.findAll({
      limit,
      offset,
      order: [['name', 'DESC']],
    }).then((games) => {
      res.send({ page, pages, games });
    });
  });
});

app.get('/users/:id/comments', (req, res) => {
  db.User.findOne({ where: { id: req.params.id } }).then((user) => {
    user.getComments().then((comments) => {
      res.send(comments);
    });
  });
});

app.put('/users/:id', (req, res) => {
  console.log(req.headers.authorization);
  console.log(process.env.JWT_KEY);
  const token = jsonwebtoken.verify(req.headers.authorization,
    process.env.JWT_KEY);
  db.User.findOne({ where: { id: token.id } })
    .then((modifyingUser) => {
      if (modifyingUser
        && (modifyingUser.authLevel !== 2
          || modifyingUser.id === parseInt(req.params.id, 10))) {
        db.User.findOne({ where: { id: req.params.id } })
          .then(user => user.update({
            nickname: req.body.user.nickname,
            email: req.body.user.email,
            biography: req.body.user.biography,
          }))
          .then((updatedUser) => {
            if (updatedUser) {
              res.send(updatedUser);
            } else {
              res.sendStatus(500);
            }
          });
      } else {
        res.sendStatus(403);
      }
    })
    .catch(() => res.sendStatus(403));
});

app.get('/users/:id', (req, res) => {
  db.User.findOne({ where: { id: req.params.id } }).then((user) => {
    res.send(user);
  });
});

app.get('/users', (_, res) => {
  db.User.findAll().then((users) => {
    res.send(users);
  });
});

app.get('/comments/:id', (req, res) => {
  db.Comment.findAll({ where: { id: req.params.id } }).then((comment) => {
    res.send(comment);
  });
});

app.get('/comments', (_, res) => {
  db.Comment.findAll().then((comments) => {
    res.send(comments);
  });
});

app.post('/games/:id/comments', (req, res) => {
  const token = jsonwebtoken.verify(req.headers.authorization,
    process.env.JWT_KEY);
  if (token) {
    db.Comment.create({
      userId: token.id,
      gameId: req.params.id,
      body: req.body.comment,
    }).then((comment) => {
      if (comment) {
        res.send(comment);
      } else {
        res.sendStatus(500);
      }
    });
  } else {
    res.sendStatus(403);
  }
});

app.post('/auth', (req, res) => {
  db.User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (user && comparePassword(req.body.password, user.password)) {
      const data = {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
        authLevel: user.authLevel,
        biography: user.biography,
        icon: user.icon,
        enabled: user.enabled,
      };
      jsonwebtoken.sign(data, process.env.JWT_KEY, { expiresIn: '1h' },
        (err, token) => {
          if (err) { console.log(err); return; }
          res.send({ token });
        });
    } else {
      res.sendStatus(401);
    }
  });
});

app.post('/register', (req, res) => {
  db.User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (user) {
      res.sendStatus(500);
    } else {
      db.User.create({
        nickname: req.body.nickname,
        email: req.body.email,
        biography: '',
        authLevel: 2,
        password: hashPassword(req.body.password),
      }).then((newUser) => {
        const data = {
          id: newUser.id,
          nickname: newUser.nickname,
          email: newUser.email,
          authLevel: newUser.authLevel,
          biography: newUser.biography,
          icon: newUser.icon,
          enabled: newUser.enabled,
        };
        jsonwebtoken.sign(data, process.env.JWT_KEY, { expiresIn: '1h' },
          (err, token) => {
            if (err) { console.log(err); return; }
            res.send({ token });
          });
      });
    }
  });
});

app.get('/search', (req, res) => {
  if (req.query && req.query.query) {
    db.Game.findAll({
      where: { name: { [op.iLike]: `%${req.query.query}%` } },
    }).then((games) => {
      db.User.findAll({
        where: { nickname: { [op.iLike]: `%${req.query.query}%` } },
      }).then((users) => {
        res.send({ games, users });
      });
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
