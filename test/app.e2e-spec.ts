import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { AreasService } from '../src/areas/areas.service';
import { ChaosSeedsService } from '../src/chaos-seeds/chaos-seeds.service';
import { AREA, CHAOS_SEED } from '../src/chaos-seeds/spec/test-data';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  const mockChaosSeedService = {
    create: jest.fn().mockReturnValue(CHAOS_SEED),
  };

  const mockAreasService = {
    getRandom: jest.fn().mockReturnValue(AREA),
    getIsDeadly: jest.fn().mockReturnValue(false),
    getName: jest.fn().mockReturnValue({
      regionName: 'region',
      biomeName: 'biome',
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AreasService)
      .useValue(mockAreasService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('AreasService should be defined', () => {
    expect(mockAreasService).toBeDefined();
  });

  it('/ chaos-seeds', async () => {
    await request(app.getHttpServer())
      .post('/chaos-seed')
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(CHAOS_SEED);
      });

    expect(mockAreasService.getRandom).toHaveBeenCalled();
    expect(mockAreasService.getName).toHaveBeenCalledWith(AREA.id);
    expect(mockAreasService.getIsDeadly).toHaveBeenCalledWith(AREA.id);
  });
});
