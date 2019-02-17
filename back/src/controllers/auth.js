import jsonwebtoken from 'jsonwebtoken';

import { db } from '../db/dbInit';
import { comparePassword } from '../auth';

const authUser = async (req, res) => {
  const user = await db.User.findOne({ where: { email: req.body.email } });
  if (user && comparePassword(req.body.password, user.password)) {
    const data = {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      authLevel: user.authLevel,
      biography: user.biography,
      icon: user.icon,
      enabled: user.enabled,
    };
    jsonwebtoken.sign(
      data,
      process.env.JWT_KEY,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.send({ token });
      },
    );
  } else {
    res.sendStatus(401);
  }
};

export default authUser;
