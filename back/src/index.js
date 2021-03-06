import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import path from 'path';
import fileUpload from 'express-fileupload';

import { sequelize } from './db/dbInit';

import seedDb from './controllers/seed';

import {
  findSavesOfGame,
  findSavesOfUser,
  createSave,
} from './controllers/save';

import {
  findCommentsOfGame,
  findCommentsOfUser,
  createComment,
  findComment,
  findComments,
} from './controllers/comment';

import {
  findUser,
  findUsers,
  createUser,
  updateUser,
} from './controllers/user';

import {
  findGame,
  findGames,
  findFeaturedGames,
  createGame,
  updateGame,
} from './controllers/game';

import authUser from './controllers/auth';

import searchUsersAndGames from './controllers/search';

const app = express();
const port = 3002;

// Parse application/json
app.use(bodyParser.json());

// Use cors
app.use(cors());

// Load environment variables from .env file
dotenv.load();

// File upload middleware
app.use(fileUpload());

sequelize.sync();

if (process.env.NODE_ENV === 'development') {
  // Show better errors in development
  app.use(errorHandler());

  // Log http accesses
  app.use(morgan('dev'));

  // Seed database
  app.get('/seed', seedDb);
}

// Routes definition

app.use('/static', express.static(path.join(__dirname, 'public')));

app.post('/games/:id/comments', createComment);

app.get('/games/:id/comments', findCommentsOfGame);

app.get('/games/featured', findFeaturedGames);

app.post('/games/:id/saves', createSave);

app.get('/games/:id/saves', findSavesOfGame);

app.put('/games/:id', updateGame);

app.get('/games/:id', findGame);

app.post('/games', createGame);

app.get('/games', findGames);

app.get('/users/:id/saves', findSavesOfUser);

app.get('/users/:id/comments', findCommentsOfUser);

app.put('/users/:id', updateUser);

app.get('/users/:id', findUser);

app.get('/users', findUsers);

app.get('/comments/:id', findComment);

app.get('/comments', findComments);

app.post('/auth', authUser);

app.post('/register', createUser);

app.get('/search', searchUsersAndGames);

app.listen(port);
