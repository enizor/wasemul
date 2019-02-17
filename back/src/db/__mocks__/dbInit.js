import { DataTypes } from 'sequelize-mock';
import modelDefiner from './modelDefinition';

const SequelizeMock = require('sequelize-mock');

const sequelize = new SequelizeMock();

const op = SequelizeMock.Op;

const db = modelDefiner(sequelize, DataTypes);
db.Game.findAll = async () => {
  const a = await db.Game.create({
    name: 'a',
    platform: 'a',
    description: 'a',
    publisher: 'a',
    countComments: () => 1,
  });
  const b = await db.Game.create({
    name: 'b',
    platform: 'b',
    description: 'b',
    publisher: 'b',
    countComments: () => 2,
  });
  const c = await db.Game.create({
    name: 'c',
    platform: 'c',
    description: 'c',
    publisher: 'c',
    countComments: () => 0,
  });
  return [a, b, c];
};

export { sequelize, op, db };
