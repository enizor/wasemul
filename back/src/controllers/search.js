import { db, op } from '../db/dbInit';

const searchUserAndGames = async (req, res) => {
  // Get all users & games matching a query
  if (req.query && req.query.query) {
    const games = await db.Game.findAll({
      where: { name: { [op.iLike]: `%${req.query.query}%` } },
    });

    const users = await db.User.findAll({
      where: { nickname: { [op.iLike]: `%${req.query.query}%` } },
    });

    res.send({ games, users });
  }
};

export default searchUserAndGames;
