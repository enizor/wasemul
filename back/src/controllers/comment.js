import jsonwebtoken from 'jsonwebtoken';

import { db } from '../db/dbInit';

const findCommentsOfGame = async (req, res) => {
  db.Game.findOne({ where: { id: req.params.id } }).then((game) => {
    game
      .getComments({
        include: [{ model: db.User, attributes: ['nickname'] }],
      })
      .then((comments) => {
        res.send(comments);
      });
  });
};

const findCommentsOfUser = async (req, res) => {
  db.User.findOne({ where: { id: req.params.id } }).then((user) => {
    user.getComments().then((comments) => {
      res.send(comments);
    });
  });
};

const createComment = (req, res) => {
  const token = jsonwebtoken.verify(
    req.headers.authorization,
    process.env.JWT_KEY,
  );
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
};

const findComment = (req, res) => {
  db.Comment.findAll({ where: { id: req.params.id } }).then((comment) => {
    res.send(comment);
  });
};

const findComments = (_, res) => {
  db.Comment.findAll().then((comments) => {
    res.send(comments);
  });
};

export {
  findCommentsOfGame,
  findCommentsOfUser,
  createComment,
  findComment,
  findComments,
};
