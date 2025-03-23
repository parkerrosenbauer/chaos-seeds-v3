import { Sequelize } from 'sequelize-typescript';
import { Language } from '../../chaos-seeds/models';

export async function seedLanguages(sequelize: Sequelize) {
  await sequelize.sync();
  console.log('Seeding languages...');

  try {
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
  } catch (error) {
    console.error('Error seeding languages:', error);
    process.exit(1);
  }
}
