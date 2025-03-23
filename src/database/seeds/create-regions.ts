import { Sequelize } from 'sequelize-typescript';
import { Region } from '../../areas/models';

export async function seedRegions(sequelize: Sequelize) {
  await sequelize.sync();
  console.log('Seeding regions...');

  try {
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
  } catch (error) {
    console.error('Error seeding regions:', error);
    process.exit(1);
  }
}
