import { config } from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Area, Biome, Region } from '../../areas/models';
import { ChaosSeed } from '../../chaos-seeds/models/chaos-seed';

config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Region, Area, Biome, ChaosSeed],
  logging: console.log,
});

async function seed() {
  await sequelize.sync();

  console.log('Seeding biomes...');
  await sequelize.transaction(async (t) => {
    const transactionHost = { transaction: t };
    await Biome.bulkCreate(
      [
        { name: 'Forest', isDeadly: false },
        { name: 'Mountain', isDeadly: false },
        { name: 'Swamp', isDeadly: false },
        { name: 'Small River', isDeadly: false },
        { name: 'Large River', isDeadly: true },
        { name: 'City', isDeadly: false },
        { name: 'Volcano', isDeadly: true },
        { name: 'Ocean', isDeadly: true },
        { name: 'Quick Sand', isDeadly: true },
        { name: 'Cave', isDeadly: false },
      ],
      transactionHost,
    );
  });

  console.log('Biomes seeded');
  await sequelize.close();
}
seed().catch((error) => {
  console.error('Error seeding biomes:', error);
  process.exit(1);
});
