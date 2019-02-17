import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs';
import { db } from '../db/dbInit';

const savesDir = `${__dirname}/../public/saves`;

const findSavesOfGame = async (req, res) => {
  const game = await db.Game.findOne({ where: { id: req.params.id } });
  const saves = await game.getSaves({
    include: [{ model: db.User, attributes: ['nickname'] }],
  });
  res.send(saves);
};

const createSave = (req, res) => {
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

export { findSavesOfGame, createSave };
