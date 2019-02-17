import jsonwebtoken from 'jsonwebtoken';
import { db } from '../db/dbInit';
import { hashPassword } from '../auth';

// Suppress some user info
const suppressUser = user => ({
  id: user.id,
  nickname: user.nickname,
  email: user.email,
  authLevel: user.authLevel,
  biography: user.biography,
  icon: user.icon,
});

const findUser = async (req, res) => {
  const user = await db.User.findOne(
    { where: { id: req.params.id, enabled: true } },
  );
  res.send(suppressUser(user));
};

const findUsers = async (_, res) => {
  const users = await db.User.findAll({ where: { enabled: true } });
  const data = users.map(suppressUser);
  res.send(data);
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
    const data = suppressUser(newUser);
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
  const modifyingUser = await db.User.findOne({ where: { id: token.id } });
  if (
    modifyingUser
    && (modifyingUser.authLevel !== 2
      || modifyingUser.id === parseInt(req.params.id, 10))
  ) {
    const user = await db.User.findOne({ where: { id: req.params.id } });

    const updatedUser = await user.update({
      nickname: req.body.user.nickname,
      email: req.body.user.email,
      biography: req.body.user.biography,
    });
    if (updatedUser) {
      res.send(suppressUser(updatedUser));
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
};

export {
  findUser, findUsers, createUser, updateUser,
};
