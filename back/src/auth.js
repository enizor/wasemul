import bcrypt from 'bcrypt';

function hashPassword(password) {
  // TODO: in a config file. Prod should be > 1000
  const saltRounds = 10;

  return bcrypt.hashSync(password, saltRounds);
}

function comparePassword(plainPass, hashword) {
  return bcrypt.compareSync(plainPass, hashword);
}

export { hashPassword, comparePassword };
