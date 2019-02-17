import user from '../../models/user';
import comment from '../../models/comment';

const game = (sequelize) => {
  const Game = sequelize.define('Game', {
    name: 'mockgame',
    platform: 'mockplatform',
    description: 'mockdesc',
    icon: 'mockicon',
    releaseDate: '2019-02-16',
    publisher: 'mockpub',
    version: 'mockver',
    enabled: true,
  });

  return Game;
};

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
