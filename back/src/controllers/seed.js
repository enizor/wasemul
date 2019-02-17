import { db, sequelize } from '../db/dbInit';
import dbSeeds from '../seeds/dbSeeds';

const seedDb = async (_, res) => {
  // Seed database with provided seeds file
  await dbSeeds(db, sequelize);
  res.send('Database seeded!');
};

export default seedDb;
