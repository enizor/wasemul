import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Save = sequelize.define('Save', {
    file: {
      type: DataTypes.TEXT,
    },
    uploadTimestamp: {
      type: DataTypes.TEXT,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });

  return Save;
};
