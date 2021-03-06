import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Game = sequelize.define('Game', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    icon: {
      type: DataTypes.STRING,
      validate: {
        is: ['[a-z0-9._-]+', 'i'],
      },
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
    },
    publisher: {
      type: DataTypes.STRING,
    },
    version: {
      type: DataTypes.STRING,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });

  return Game;
};
