import game from '../models/game';
import user from '../models/user';
import comment from '../models/comment';

export default (sequelize, DataTypes) => {
  const Game = game(sequelize, DataTypes);
  const User = user(sequelize, DataTypes);
  const Comment = comment(sequelize, DataTypes);

  Comment.belongsTo(User, { foreignKey: 'userId' });
  Comment.belongsTo(Game, { foreignKey: 'gameId' });
  Game.hasMany(Comment, { foreignKey: { name: 'gameId', allowNull: false } });
  Game.belongsToMany(User, { through: 'GameUser' });
  User.hasMany(Comment, { foreignKey: { name: 'userId', allowNull: false } });
  User.belongsToMany(Game, { through: 'GameUser' });

  return {
    User,
    Game,
    Comment,
  };
};
