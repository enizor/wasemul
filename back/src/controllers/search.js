import { db, op } from '../db/dbInit';

const searchUserAndGames = async (req, res) => {
  if (req.query && req.query.query) {
    db.Game.findAll({
      where: { name: { [op.iLike]: `%${req.query.query}%` } },
    }).then((games) => {
      db.User.findAll({
        where: { nickname: { [op.iLike]: `%${req.query.query}%` } },
      }).then((users) => {
        res.send({ games, users });
      });
    });
  }
};

export default searchUserAndGames;
