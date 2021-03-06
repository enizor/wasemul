import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define('User', {
    // TODO: Make unique?
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // TODO: Make unique?
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    // Admin:0, Modo: 1, regular user: 2
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
      defaultValue: true,
      allowNull: false,
    },
  });

  return User;
};
