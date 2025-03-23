import { Sequelize } from 'sequelize-typescript';
import { Biome } from '../../areas/models';

export async function seedBiomes(sequelize: Sequelize) {
  await sequelize.sync();
  console.log('Seeding biomes...');

  try {
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
  } catch (error) {
    console.error('Error seeding biomes:', error);
    process.exit(1);
  }
}
