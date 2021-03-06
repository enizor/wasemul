import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import modelDefiner from './modelDefinition';

dotenv.load();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWD,
  {
    host: 'db',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 1000,
    },
  },
);

const op = Sequelize.Op;

const db = modelDefiner(sequelize, DataTypes);

export {
  sequelize,
  op,
  db,
};
