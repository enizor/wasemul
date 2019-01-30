import bcrypt from 'bcrypt';

const configuration = process.env.NODE_ENV === 'production'
  ? require('./config/prod.json')
  : require('./config/dev.json');

function hashPassword(password) {
  return bcrypt.hashSync(password, configuration.SALT_ROUNDS);
}

function comparePassword(plainPass, hashword) {
  return bcrypt.compareSync(plainPass, hashword);
}

export { hashPassword, comparePassword };
