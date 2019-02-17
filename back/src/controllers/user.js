import jsonwebtoken from 'jsonwebtoken';
import { db } from '../db/dbInit';
import { hashPassword } from '../auth';

const findUser = async (req, res) => {
  // Find data about a user
  const user = await db.User.findOne({ where: { id: req.params.id } });
  res.send(user);
};

const findUsers = async (_, res) => {
  // Find data about all users
  const users = await db.User.findAll();
  res.send(users);
};

const createUser = async (req, res) => {
  // Create a new user and sends it its token
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
  // Updates a user if the modifier is an admin or the user itself
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
      res.send(updatedUser);
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
