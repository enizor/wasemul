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
        isUrl: true,
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
    },
  });

  return Game;
};
