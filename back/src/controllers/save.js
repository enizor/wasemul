import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs';
import { db } from '../db/dbInit';

const savesDir = `${__dirname}/../public/saves`;

const findSavesOfGame = async (req, res) => {
  // Find saves of a game, in increments of 5 (for pagination)
  const game = await db.Game.findOne({ where: { id: req.params.id } });
  const allSaves = await game.getSaves();

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
  // Find saves of a user, in increments of 5 (for pagination)
  const user = await db.User.findOne({ where: { id: req.params.id } });
  const allSaves = await user.getSaves();

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
  // Create a new save entry for the given user, and save the provided file to the disk
  const uploadFile = req.files.file;
  const fileName = req.files.file.name;

  const token = jsonwebtoken.verify(
    req.headers.authorization,
    process.env.JWT_KEY,
  );

  const uploadTimestamp = Date.now().toString();

  if (token) {
    if (!fs.existsSync(savesDir)) {
      fs.mkdirSync(savesDir);
    }
    // Try to save on disk
    // Timestamp is added to file name to prevent overwriting of files with the same name
    uploadFile.mv(`${savesDir}/${uploadTimestamp}-${fileName}`, async (err) => {
      if (err) {
        res.sendStatus(500);
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
