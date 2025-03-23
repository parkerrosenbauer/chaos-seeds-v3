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

  console.log('Seeding abilities...');
  await sequelize.transaction(async (t) => {
    const transactionHost = { transaction: t };
    await Ability.bulkCreate(
      [
        {
          name: 'Limitless',
          description:
            'Limitless is a legendary ability that allows the bearer to reach any level in any Skill. Limitless also grants a constant 100% Affinity regardless of the level of the skill attained.',
          chance: 1,
        },
        {
          name: 'Identify',
          description:
            'The ability to name all but the most powerful of items.',
          chance: 4,
        },
        {
          name: 'Empathic Knowledge',
          description:
            'The ability to deeply understand the wants and needs of others',
          chance: 7,
        },
        {
          name: 'Comradery',
          description:
            'This ability allows the bearer to more easily create positive relationships by giving a 50% boost to the growth of positive Relationship Points and a 50% decrease of negative Relationship Points.',
          chance: 5,
        },
        {
          name: 'Forced Friend',
          description:
            "Grants up to 1,000 Relationship Points per day with anyone that the bearer touches. The Relationship Points earned through this ability increase with the bearer's Charisma attribute.",
          chance: 3,
        },
      ],
      transactionHost,
    );
  });

  console.log('Abilities seeded');
  await sequelize.close();
}
seed().catch((error) => {
  console.error('Error seeding abilities:', error);
  process.exit(1);
});
