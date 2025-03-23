import { Sequelize } from 'sequelize-typescript';
import { Area } from '../../areas/models';

export async function seedAreas(sequelize: Sequelize) {
  await sequelize.sync();
  console.log('Seeding areas...');

  try {
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
  } catch (error) {
    console.error('Error seeding areas:', error);
    process.exit(1);
  }
}
