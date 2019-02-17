import jsonwebtoken from 'jsonwebtoken';

import { db } from '../db/dbInit';

const findCommentsOfGame = async (req, res) => {
  const game = await db.Game.findOne({ where: { id: req.params.id } });
  const comments = await game.getComments({
    order: [['createdAt', 'DESC']],
    include: [{ model: db.User, attributes: ['nickname'] }],
  });
  res.send(comments);
};

const findCommentsOfUser = async (req, res) => {
  const user = await db.User.findOne({ where: { id: req.params.id } });
  const comments = await user.getComments({
    order: [['createdAt', 'DESC']],
  });
  res.send(comments);
};

const createComment = async (req, res) => {
  const token = jsonwebtoken.verify(
    req.headers.authorization,
    process.env.JWT_KEY,
  );

  if (token) {
    const comment = await db.Comment.create({
      userId: token.id,
      gameId: req.params.id,
      body: req.body.comment,
    });

    if (comment) {
      res.send(comment);
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
};

const findComment = async (req, res) => {
  const comment = await db.Comment.findAll({ where: { id: req.params.id } });
  res.send(comment);
};

const findComments = async (_, res) => {
  const comments = await db.Comment.findAll();
  res.send(comments);
};

export {
  findCommentsOfGame,
  findCommentsOfUser,
  createComment,
  findComment,
  findComments,
};
