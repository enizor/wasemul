import moment from 'moment';
import { hashPassword } from '../auth';

/* eslint-disable max-len */
export default (db, sequelize) => {
  sequelize.sync({ force: true }).then(async () => {
    const userTest = await db.User.create({
      nickname: 'test',
      email: 'test@example.com',
      biography: 'This is a sample user',
      authLevel: 2,
      password: hashPassword('test'),
    });
    const userKevin = await db.User.create({
      nickname: 'XxX__K3v1nDu91__XxX',
      email: 'kevin.veryswag@gmail.com',
      biography: '',
      authLevel: 2,
      password: hashPassword('hunter1'),
    });
    const admin = await db.User.create({
      nickname: 'admin',
      email: 'admin@canttouchthis.com',
      icon: 'https://static.cuisineaz.com/400x320/i108058-kebab-sans-gluten.jpg',
      authLevel: 0,
      password: hashPassword('CorrectHorseBatteryStaple'),
    });
    const pkRed = await db.Game.create({
      name: 'Pokemon Green',
      platform: 'Game Boy',
      description: 'A 10-year old is kicked out of his house, and must organize pet battles to fuel his casino addiction',
      icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Pok%C3%A9mon_box_art_-_Red_Version.png/220px-Pok%C3%A9mon_box_art_-_Red_Version.png',
      releaseDate: moment('1996-02-27T00:00:00.000Z'),
      publisher: 'Nintendo',
    });
    const zelda = await db.Game.create({
      name: 'The Legend Of Zelda: The Minish Cap',
      platform: 'Game Boy Advance',
      description: 'Wearing a green suit apparently forces you to save the world...',
      icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/The_Legend_of_Zelda_The_Minish_Cap_Game_Cover.JPG/220px-The_Legend_of_Zelda_The_Minish_Cap_Game_Cover.JPG',
      releaseDate: moment('2004-11-04T00:00:00.000Z'),
      publisher: 'Nintendo',
    });
    db.Comment.create({
      userId: userKevin.id,
      gameId: pkRed.id,
      body: 'OMG this game is so hard :(',
    });
    db.Comment.create({
      userId: admin.id,
      gameId: pkRed.id,
      body: 'Mew is under the truck ;)',
    });
    db.Comment.create({
      userId: userTest.id,
      gameId: zelda.id,
      body: 'I managed to collect all the figurines!',
    });
  });
};
