import { config } from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { ChaosSeed } from '../../chaos-seeds/models/chaos-seed';
import {
  Ability,
  ChaosSeedAbility,
  ChaosSeedLanguage,
  Language,
  Race,
} from '../../chaos-seeds/models';
import { Area, Biome, Region } from '../../areas/models';

config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [
    Race,
    ChaosSeed,
    Language,
    ChaosSeedLanguage,
    ChaosSeedAbility,
    Ability,
    Area,
    Region,
    Biome,
  ],
  logging: console.log,
});

async function seed() {
  await sequelize.sync();

  console.log('Seeding languages...');
  await sequelize.transaction(async (t) => {
    const transactionHost = { transaction: t };
    await Language.bulkCreate(
      [
        { name: 'Common' },
        { name: 'Elvish' },
        { name: 'Dwarvish' },
        { name: 'Gnomish' },
      ],
      transactionHost,
    );
  });

  console.log('Languages seeded');
  await sequelize.close();
}
seed().catch((error) => {
  console.error('Error seeding languages:', error);
  process.exit(1);
});
