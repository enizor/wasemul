import game from '../models/game';
import user from '../models/user';
import comment from '../models/comment';
import save from '../models/save';

export default (sequelize, DataTypes) => {
  const Game = game(sequelize, DataTypes);
  const User = user(sequelize, DataTypes);
  const Comment = comment(sequelize, DataTypes);
  const Save = save(sequelize, DataTypes);

  Comment.belongsTo(User, { foreignKey: 'userId' });
  Comment.belongsTo(Game, { foreignKey: 'gameId' });
  Save.belongsTo(User, { foreignKey: 'userId' });
  Save.belongsTo(Game, { foreignKey: 'gameId' });
  Game.hasMany(Comment, { foreignKey: { name: 'gameId', allowNull: false } });
  Game.hasMany(Save, { foreignKey: { name: 'gameId', allowNull: false } });
  Game.belongsToMany(User, { through: 'GameUser' });
  User.hasMany(Comment, { foreignKey: { name: 'userId', allowNull: false } });
  User.hasMany(Save, { foreignKey: { name: 'userId', allowNull: false } });
  User.belongsToMany(Game, { through: 'GameUser' });

  return {
    User,
    Game,
    Comment,
    Save,
  };
};
