import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedsController } from '../chaos-seeds.controller';
import { AREA, CHAOS_SEED } from './test-data';
import { AreasService } from 'src/areas/areas.service';
import { ChaosSeedsService } from '../chaos-seeds.service';

describe('ChaosSeedsController', () => {
  let controller: ChaosSeedsController;
  const chaosSeedsService = {
    create: jest.fn().mockResolvedValue(CHAOS_SEED),
    patchName: jest.fn().mockResolvedValue({ name: 'Heman' }),
  };
  const areasService = {
    getRandom: jest.fn().mockResolvedValue(AREA),
    getIsDeadly: jest.fn().mockResolvedValue(false),
    getName: jest.fn().mockResolvedValue({
      regionName: 'region',
      biomeName: 'biome',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChaosSeedsController],
      providers: [
        {
          provide: AreasService,
          useValue: areasService,
        },
        {
          provide: ChaosSeedsService,
          useValue: chaosSeedsService,
        },
      ],
    }).compile();

    controller = module.get<ChaosSeedsController>(ChaosSeedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new chaos seed', () => {
      const chaosSeed = controller.create();
      expect(chaosSeed).resolves.toEqual(CHAOS_SEED);
      expect(chaosSeedsService.create).toHaveBeenCalled();
    });
  });

  describe('patchName', () => {
    it('should returned the cleaned chaos seed name', () => {
      const chaosSeedNameReq = { name: 'Heman_123' };
      const chaosSeedName = controller.patchName(1, chaosSeedNameReq);
      expect(chaosSeedName).resolves.toEqual({ name: 'Heman' });
      expect(chaosSeedsService.patchName).toHaveBeenCalled();
    });
  });
});
