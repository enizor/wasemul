import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Comment = sequelize.define('Comment', {
    body: {
      type: DataTypes.TEXT,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });

  return Comment;
};
