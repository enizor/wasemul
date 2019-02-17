import jsonwebtoken from 'jsonwebtoken';

import { db } from '../db/dbInit';

const findCommentsOfGame = async (req, res) => {
  const game = await db.Game.findOne({ where: { id: req.params.id } });
  const allComments = await game.getComments({
    include: [{ model: db.User, attributes: ['nickname'] }],
  });
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
  const user = await db.User.findOne({ where: { id: req.params.id } });
  const comments = await user.getComments({
    order: [['createdAt', 'DESC']],
  });
  res.send(comments);
};

const createComment = async (req, res) => {
  if (!req.headers.authorization) {
    res.sendStatus(403);
    return;
  }
  let token;
  try {
    token = jsonwebtoken.verify(
      req.headers.authorization,
      process.env.JWT_KEY,
    );
  } catch (err) {
    res.sendStatus(403);
    return;
  }

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
