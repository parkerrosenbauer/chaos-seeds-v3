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

  console.log('Seeding regions...');
  await sequelize.transaction(async (t) => {
    const transactionHost = { transaction: t };
    await Region.bulkCreate(
      [
        {
          name: 'The Forest of Nadria',
          description:
            'The Forest of Nadria is a 600.000 square miles area of woodland that is part of the River Peninsula',
        },
        {
          name: 'Rione',
          description:
            'Rione is a kingdom bordering Yves to the northeast, separated by the Serrated Mountains.',
        },
        {
          name: 'The Serrated Mountains',
          description:
            'The Serrated Mountains are a mountain range that separates Rione from Yves.',
        },
        {
          name: 'Firetip Mountains',
          description:
            'The Firetip Mountains are a mountain range that separates the River Peninsula from the rest of the continent.',
        },
        {
          name: 'The River Peninsula',
          description:
            'The River Peninsula is a large peninsula that is home to the kingdoms of Rione and Yves.',
        },
        {
          name: 'Yves',
          description:
            'Yves is a kingdom bordering Rione to the southwest, separated by the Serrated Mountains.',
        },
        {
          name: 'Azergoth Swamp',
          description:
            'The Azergoth Swamp is a large swamp that is part of the River Peninsula.',
        },
      ],
      transactionHost,
    );
  });

  console.log('Regions seeded');
  await sequelize.close();
}
seed().catch((error) => {
  console.error('Error seeding regions:', error);
  process.exit(1);
});
