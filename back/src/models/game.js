import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Game = sequelize.define('Game', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
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
  });

  return Game;
};
