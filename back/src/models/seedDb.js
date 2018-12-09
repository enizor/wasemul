export default async (db, sequelize) => {
  sequelize.sync({ force: true }).then(async () => {
    const user = await db.User.create({
      login: 'test',
      email: 'test@example.com',
      authLevel: 0,
    });
    const game = await db.Game.create({
      title: 'Pokemon Green',
    });
    db.Comment.create({
      userId: user.id,
      gameId: game.id,
      text: 'Awesome game',
    });
  });
};
