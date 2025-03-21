import { config } from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Area, Biome, Region } from '../../areas/models';
import { ChaosSeed } from '../../chaos-seeds/models/chaos-seed';

config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: 5401,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Region, Area, Biome, ChaosSeed],
  logging: console.log,
});

async function seed() {
  await sequelize.sync();

  console.log('Seeding areas...');
  await sequelize.transaction(async (t) => {
    const transactionHost = { transaction: t };
    await Area.bulkCreate(
      [
        { regionId: 1, biomeId: 1, chance: 6 },
        { regionId: 1, biomeId: 2, chance: 2 },
        { regionId: 1, biomeId: 9, chance: 1 },
        { regionId: 2, biomeId: 2, chance: 4 },
        { regionId: 2, biomeId: 6, chance: 5 },
        { regionId: 3, biomeId: 2, chance: 5 },
        { regionId: 3, biomeId: 7, chance: 1 },
        { regionId: 3, biomeId: 10, chance: 2 },
        { regionId: 4, biomeId: 2, chance: 4 },
        { regionId: 4, biomeId: 10, chance: 1 },
        { regionId: 4, biomeId: 7, chance: 4 },
        { regionId: 5, biomeId: 5, chance: 2 },
        { regionId: 6, biomeId: 2, chance: 5 },
        { regionId: 6, biomeId: 6, chance: 8 },
        { regionId: 7, biomeId: 3, chance: 4 },
        { regionId: 7, biomeId: 9, chance: 2 },
        { regionId: 7, biomeId: 10, chance: 1 },
      ],
      transactionHost,
    );
  });

  console.log('Areas seeded');
  await sequelize.close();
}
seed().catch((error) => {
  console.error('Error seeding areas:', error);
  process.exit(1);
});
