import jsonwebtoken from 'jsonwebtoken';
import { db } from '../db/dbInit';

const findGame = async (req, res) => {
  // Get data about a particular game id
  const game = await db.Game.findOne({ where: { id: req.params.id } });
  res.send(game);
};

const findGames = async (req, res) => {
  // Get all games in increments of 5 (for pagination)
  const limit = 5;
  const data = await db.Game.findAndCountAll();

  const page = req.query.page || 1;
  const pages = Math.ceil(data.count / limit);

  const offset = limit * (page - 1);

  const games = await db.Game.findAll({
    limit,
    offset,
    order: [['name', 'DESC']],
  });
  res.send({ page, pages, games });
};

const updateGame = async (req, res) => {
  // Update a given game (if user is an admin) with the provided fields
  const token = jsonwebtoken.verify(
    req.headers.authorization,
    process.env.JWT_KEY,
  );

  const modifyingUser = await db.User.findOne({ where: { id: token.id } });

  if (modifyingUser && modifyingUser.authLevel !== 2) {
    const game = await db.Game.findOne({ where: { id: req.params.id } });

    if (!game) {
      res.sendStatus(403);
    }

    const updatedGame = await game.update({
      name: req.body.game.name,
      platform: req.body.game.platform,
      description: req.body.game.description,
      publisher: req.body.game.publisher,
    });

    if (updatedGame) {
      res.send(updatedGame);
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
};

const findFeaturedGames = async (_, res) => {
  // Find featured games, ie. most active games at present time

  const games = await db.Game.findAll();
  const times = [];
  const comments = [];

  for (let i = 0; i < games.length; i += 1) {
    times.push(Date.parse(games[i].dataValues.createdAt) / 1000);
    comments.push(games[i].countComments({}));
  }

  const minTime = Math.min(...times);
  const result = await Promise.all(comments);

  for (let i = 0; i < games.length; i += 1) {
    // The more recent a comment is, the more worth it has
    games[i].score = 0;
    games[i].score += (times[i] - minTime) / 1000;
    games[i].score += result[i];
  }
  // Sort games according to score and return the first 5
  games.sort((a, b) => b.score - a.score);
  res.send(games.slice(0, 5));
};

const createGame = async (req, res) => {
  // Create a new game (only if the user is an admin)
  const token = jsonwebtoken.verify(
    req.headers.authorization,
    process.env.JWT_KEY,
  );

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
};

export {
  findGame, findGames, updateGame, findFeaturedGames, createGame,
};
