import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { AreasService } from '../src/areas/areas.service';
import { Sequelize } from 'sequelize-typescript';
import { ChaosSeed } from '../src/chaos-seeds/models/chaos-seed';
import { ChaosSeedName } from '../src/chaos-seeds/value-objects';

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
  });

  afterEach(async () => {
    await sequelize.sync({ alter: true });
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

  describe('PATCH /chaos-seeds/:id/name', () => {
    it('should update the name in the database when the chaos seed is alive', async () => {
      const newChaosSeed = await ChaosSeed.create({
        isDeadOnArrival: false,
        startingAreaId: 1,
      });
      const chaosSeedId = newChaosSeed.id;
      const patchResponse = await request(app.getHttpServer())
        .patch(`/chaos-seeds/${chaosSeedId}/name`)
        .send({ name: 'Heman_123' })
        .expect(200);

      // response
      expect(patchResponse.body).toEqual({ name: 'Heman' });

      // database
      const chaosSeed = await ChaosSeed.findByPk(chaosSeedId);
      expect(chaosSeed?.name).toEqual('Heman');
    });

    it('should throw error when updating a dead chaos seed name', async () => {
      const newChaosSeed = await ChaosSeed.create({
        isDeadOnArrival: true,
        startingAreaId: 1,
      });
      const chaosSeedId = newChaosSeed.id;
      await request(app.getHttpServer())
        .patch(`/chaos-seeds/${chaosSeedId}/name`)
        .send({ name: 'Heman_123' })
        .expect(400);

      // database
      const chaosSeed = await ChaosSeed.findByPk(chaosSeedId);
      expect(chaosSeed?.name).toEqual('Unknown');
    });
  });
});
