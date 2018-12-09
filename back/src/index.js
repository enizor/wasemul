/* eslint-disable no-console */

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import dbController from './models/dbController';
import seedDb from './models/seedDb';

const app = express();
const port = 3001;

// Parse application/json
app.use(bodyParser.json());

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

app.get('/', (_, res) => {
  res.send('Hello world!');
});

app.get('/games/:id/comments', (req, res) => {
  db.Game.findOne({ where: { id: req.params.id } }).then((game) => {
    game.getComments().then((comments) => {
      res.send(comments);
    });
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

app.listen(port, () => console.log(`Example app listening on port ${port}`));