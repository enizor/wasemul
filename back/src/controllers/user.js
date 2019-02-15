import jsonwebtoken from 'jsonwebtoken';
import { db } from '../db/dbInit';
import { hashPassword } from '../auth';


const findUser = async (req, res) => {
  db.User.findOne({ where: { id: req.params.id } }).then((user) => {
    res.send(user);
  });
};

const findUsers = async (_, res) => {
  db.User.findAll().then((users) => {
    res.send(users);
  });
};

const createUser = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (user) {
      res.sendStatus(500);
    }
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      email: req.body.email,
      biography: '',
      authLevel: 2,
      password: hashPassword(req.body.password),
    });
    const data = {
      id: newUser.id,
      nickname: newUser.nickname,
      email: newUser.email,
      authLevel: newUser.authLevel,
      biography: newUser.biography,
      icon: newUser.icon,
      enabled: newUser.enabled,
    };
    jsonwebtoken.sign(
      data,
      process.env.JWT_KEY,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          return;
        }
        res.send({ token });
      },
    );
  } catch (err) {
    res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  const token = jsonwebtoken.verify(
    req.headers.authorization,
    process.env.JWT_KEY,
  );
  db.User.findOne({ where: { id: token.id } })
    .then((modifyingUser) => {
      if (
        modifyingUser
        && (modifyingUser.authLevel !== 2
          || modifyingUser.id === parseInt(req.params.id, 10))
      ) {
        db.User.findOne({ where: { id: req.params.id } })
          .then(user => user.update({
            nickname: req.body.user.nickname,
            email: req.body.user.email,
            biography: req.body.user.biography,
          }))
          .then((updatedUser) => {
            if (updatedUser) {
              res.send(updatedUser);
            } else {
              res.sendStatus(500);
            }
          });
      } else {
        res.sendStatus(403);
      }
    })
    .catch(() => res.sendStatus(403));
};
export {
  findUser,
  findUsers,
  createUser,
  updateUser,
};
