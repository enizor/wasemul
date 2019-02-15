import { db, sequelize } from '../db/dbInit';

const seedDb = async (_, res) => {
  await seedDb(db, sequelize);
  res.send('Database seeded!');
};

export default seedDb;
