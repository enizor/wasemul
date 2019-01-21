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
const port = 3001;

app.use(cors());

// Parse application/json
app.use(bodyParser.json());

app.use(cors());

dotenv.load();

const { db, sequelize } = dbController();

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
    game.getComments({
      include: [{ model: db.User, attributes: ['nickname'] }],
    }).then((comments) => {
      res.send(comments);
    });
  });
});

app.get('/games/featured', (_, res) => {
  db.Game.findAll({ limit: 10 }).then((games) => {
    res.send(games);
  });
});

app.get('/games/featured', (_, res) => {
  db.Game.findAll({ limit: 10 }).then((games) => {
    res.send(games);
  });
});

app.get('/games/:id', (req, res) => {
  db.Game.findOne({ where: { id: req.params.id } }).then((game) => {
    res.send(game);
  });
});

app.get('/games', (_, res) => {
  db.Game.findAll().then((games) => {
    res.send(games);
  });
});

app.get('/users/:id/comments', (req, res) => {
  db.User.findOne({ where: { id: req.params.id } }).then((user) => {
    user.getComments().then((comments) => {
      res.send(comments);
    });
  });
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

app.post('/auth', (req, res) => {
  console.log(req.body);
  db.User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (user && comparePassword(req.body.password, user.password)) {
      const data = {
        nickname: user.nickname,
        email: user.email,
        authLevel: user.authLevel,
        biography: user.biography,
        icon: user.icon,
        enabled: user.enabled,
      };
      jsonwebtoken.sign(data, 'privateKey', { expiresIn: '1h' },
        (err, token) => {
          if (err) { console.log(err); }
          res.send({ token });
        });
    } else {
      res.sendStatus(401);
    }
  });
});

app.post('/register', (req, res) => {
  console.log(req.body);
  db.User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (user) {
      res.sendStatus(500);
    } else {
      const newUser = db.User.create({
        nickname: req.body.nickname,
        email: req.body.email,
        biography: '',
        authLevel: 2,
        password: hashPassword(req.body.password),
      });
      const data = {
        nickname: newUser.nickname,
        email: newUser.email,
        authLevel: newUser.authLevel,
        biography: newUser.biography,
        icon: newUser.icon,
        enabled: newUser.enabled,
      };
      jsonwebtoken.sign(data, 'privateKey', { expiresIn: '1h' },
        (err, token) => {
          if (err) { console.log(err); }
          res.send({ token });
        });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
