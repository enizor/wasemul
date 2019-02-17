import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Save = sequelize.define('Save', {
    file: {
      type: DataTypes.TEXT,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Save;
};
