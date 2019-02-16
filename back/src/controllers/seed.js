import { db, sequelize } from '../db/dbInit';
import dbSeeds from '../seeds/dbSeeds';

const seedDb = async (_, res) => {
  await dbSeeds(db, sequelize);
  res.send('Database seeded!');
};

export default seedDb;
