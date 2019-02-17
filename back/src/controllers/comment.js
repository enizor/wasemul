import jsonwebtoken from 'jsonwebtoken';

import { db } from '../db/dbInit';

const findCommentsOfGame = async (req, res) => {
  // Get all comments of a game, but in increments of 5 games / page
  const game = await db.Game.findOne({ where: { id: req.params.id } });
  const allComments = await game.getComments();

  const limit = 5;
  const page = req.query.page || 1;
  const pages = Math.ceil(allComments.length / limit);
  const offset = limit * (page - 1);

  const comments = await game.getComments({
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    include: [{ model: db.User, attributes: ['nickname'] }],
  });
  res.send({ page, pages, comments });
};

const findCommentsOfUser = async (req, res) => {
  // Get all comments of a user (not actually used yet)
  const user = await db.User.findOne({ where: { id: req.params.id } });
  const comments = await user.getComments({
    order: [['createdAt', 'DESC']],
  });
  res.send(comments);
};

const createComment = async (req, res) => {
  // Create a comment belonging to the user identified by the token
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
  // Find a given comment
  const comment = await db.Comment.findAll({ where: { id: req.params.id } });
  res.send(comment);
};

const findComments = async (_, res) => {
  // Get all comments
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
