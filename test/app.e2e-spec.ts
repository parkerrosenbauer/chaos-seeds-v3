import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Sequelize } from 'sequelize-typescript';
import { ChaosSeed } from '../src/chaos-seeds/models/chaos-seed';
import { seedDatabase } from '../src/database/seeds';
import { AreasService } from '../src/areas/areas.service';
import { ChaosSeedAbility } from '../src/chaos-seeds/models';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let sequelize: Sequelize;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    sequelize = moduleFixture.get(Sequelize);

    // reset and reseed the database
    await sequelize.sync({ force: true });
    await seedDatabase(sequelize);
  });

  afterAll(async () => {
    await sequelize.close();
    await app.close();
  });

  describe('POST /chaos-seeds', () => {
    it('should add a new chaos seed to the database', async () => {
      const response = await request(app.getHttpServer())
        .post('/chaos-seeds')
        .expect(201);

      // response
      expect(response.body).toHaveProperty('chaosSeedId');

      // database
      const chaosSeed = await ChaosSeed.findByPk(response.body.chaosSeedId);
      expect(chaosSeed).not.toBeNull();
      expect(chaosSeed?.name).toEqual('Unknown');
    });

    it('should call AreasService.getRandom', async () => {
      const areasService = app.get(AreasService);
      const getRandomSpy = jest.spyOn(areasService, 'getRandom');
      await request(app.getHttpServer()).post('/chaos-seeds').expect(201);

      expect(getRandomSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('PATCH /chaos-seeds/:id/self', () => {
    it('should patch the chaos seed and update db when alive', async () => {
      const newChaosSeed = await ChaosSeed.create({
        isDeadOnArrival: false,
        startingAreaId: 1,
      });

      const patchResponse = await request(app.getHttpServer())
        .patch(`/chaos-seeds/${newChaosSeed.id}/self`)
        .send({ name: 'Heman_123' })
        .expect(200);

      // response
      expect(patchResponse.body).toEqual({ name: 'Heman' });

      // database
      const chaosSeed = await ChaosSeed.findByPk(newChaosSeed.id);

      // verify chaos seed was assigned an ability
      const chaosSeedAbilities = await chaosSeed?.$get('abilities');
      expect(chaosSeedAbilities).not.toBeNull();
      expect(chaosSeedAbilities?.length).toBeGreaterThan(0);
      const assignedAbility = chaosSeedAbilities![0];
      expect(assignedAbility).toBeDefined();

      // verify ChaosSeedAbility entry
      const chaosSeedAbilityEntry = await ChaosSeedAbility.findOne({
        where: {
          chaosSeedId: chaosSeed?.id,
          abilityId: assignedAbility.id,
        },
      });
      expect(chaosSeedAbilityEntry).not.toBeNull();

      // verify ability was assigned the chaos seed
      const abilityChaosSeeds = await assignedAbility.$get('chaosSeeds');
      expect(abilityChaosSeeds).not.toBeNull();
      expect(abilityChaosSeeds?.length).toBeGreaterThan(0);
      const assignedChaosSeed = abilityChaosSeeds![0];
      expect(assignedChaosSeed).toBeDefined();
      expect(assignedChaosSeed.id).toEqual(chaosSeed?.id);
    });
  });
});
