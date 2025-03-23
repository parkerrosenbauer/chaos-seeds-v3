import { Sequelize } from 'sequelize-typescript';
import { seedAbilities } from './create-abilities';
import { seedAreas } from './create-areas';
import { seedBiomes } from './create-biomes';
import { seedLanguages } from './create-languages';
import { seedRaces } from './create-races';
import { seedRegions } from './create-regions';

export async function seedDatabase(sequelize: Sequelize) {
  console.log('Seeding database...');
  await seedRegions(sequelize);
  await seedBiomes(sequelize);
  await seedAreas(sequelize);
  await seedLanguages(sequelize);
  await seedRaces(sequelize);
  await seedAbilities(sequelize);
  console.log('Database seeded');
}
