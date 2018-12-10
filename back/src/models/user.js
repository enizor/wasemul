import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define('User', {
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    authLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
    },
    icon: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    enabled: {
      type: DataTypes.BOOLEAN,
    },
  });

  return User;
};
