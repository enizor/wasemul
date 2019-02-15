import jsonwebtoken from 'jsonwebtoken';
import { db } from '../db/dbInit';

const findGame = async (req, res) => {
  db.Game.findOne({ where: { id: req.params.id } }).then((game) => {
    res.send(game);
  });
};

const findGames = async (req, res) => {
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
};

const updateGame = async (req, res) => {
  const token = jsonwebtoken.verify(
    req.headers.authorization,
    process.env.JWT_KEY,
  );
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
};

const findFeaturedGames = async (_, res) => {
  db.Game.findAll({ limit: 10 }).then((games) => {
    res.send(games);
  });
};

const createGame = async (req, res) => {
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
  findGame,
  findGames,
  updateGame,
  findFeaturedGames,
  createGame,
};
