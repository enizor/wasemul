export default async (db, sequelize) => {
  sequelize.sync({ force: true }).then(async () => {
    const user = await db.User.create({
      nickname: 'test',
      email: 'test@example.com',
      authLevel: 0,
    });
    const game = await db.Game.create({
      name: 'Pokemon Green',
      publisher: 'Some Company',
      releaseDate: "1996-01-01",
    });
    db.Comment.create({
      userId: user.id,
      gameId: game.id,
      body: 'Awesome game',
    });
  });
};
