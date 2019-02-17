import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs';
import { db } from '../db/dbInit';

const savesDir = `${__dirname}/../public/saves`;

const findSavesOfGame = async (req, res) => {
  const game = await db.Game.findOne({ where: { id: req.params.id } });
  const allSaves = await game.getSaves({
    include: [{ model: db.User, attributes: ['nickname'] }],
  });
  const limit = 5;
  const page = req.query.page || 1;
  const pages = Math.ceil(allSaves.length / limit);
  const offset = limit * (page - 1);

  const saves = await game.getSaves({
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    include: [{ model: db.User, attributes: ['nickname'] }],
  });
  res.send({ page, pages, saves });
};

const findSavesOfUser = async (req, res) => {
  const user = await db.User.findOne({ where: { id: req.params.id } });
  const allSaves = await user.getSaves({
    include: [{ model: db.Game, attributes: ['name'] }],
  });
  const limit = 5;
  const page = req.query.page || 1;
  const pages = Math.ceil(allSaves.length / limit);
  const offset = limit * (page - 1);

  const saves = await user.getSaves({
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    include: [{ model: db.Game, attributes: ['name'] }],
  });
  res.send({ page, pages, saves });
};

const createSave = (req, res) => {
  const uploadFile = req.files.file;
  const fileName = req.files.file.name;

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

  const uploadTimestamp = Date.now().toString();

  if (token) {
    if (!fs.existsSync(savesDir)) {
      fs.mkdirSync(savesDir);
    }
    uploadFile.mv(`${savesDir}/${uploadTimestamp}-${fileName}`, async (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const save = await db.Save.create({
          userId: token.id,
          gameId: req.params.id,
          file: fileName,
          uploadTimestamp,
        });

        if (save) {
          res.send(save);
        } else {
          res.sendStatus(500);
        }
      }
    });
  }
};

export { findSavesOfGame, findSavesOfUser, createSave };
