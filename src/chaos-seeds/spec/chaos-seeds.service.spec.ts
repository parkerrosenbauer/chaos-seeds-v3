import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedsService } from '../chaos-seeds.service';
import { AREA, CHAOS_SEED } from './test-data';
import { AreasService } from 'src/areas/areas.service';
import { ChaosSeed } from '../models/chaos-seed';
import { getModelToken } from '@nestjs/sequelize';

describe('ChaosSeedsService', () => {
  let service: ChaosSeedsService;
  const mockChaosSeed = {
    create: jest.fn().mockResolvedValue({ id: 1, isDeadOnArrival: false }),
  };
  const mockAreaService = {
    getRandom: jest.fn().mockReturnValue(AREA),
    getIsDeadly: jest.fn().mockReturnValue(false),
    getName: jest.fn().mockReturnValue({
      regionName: 'region',
      biomeName: 'biome',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChaosSeedsService,
        {
          provide: getModelToken(ChaosSeed),
          useValue: mockChaosSeed,
        },
        {
          provide: AreasService,
          useValue: mockAreaService,
        },
      ],
    }).compile();

    service = module.get<ChaosSeedsService>(ChaosSeedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new chaos seed', () => {
      const chaosSeed = service.create();
      expect(chaosSeed).resolves.toEqual(CHAOS_SEED);
      expect(mockChaosSeed.create).toHaveBeenCalled();
      expect(mockAreaService.getRandom).toHaveBeenCalled();
      expect(mockAreaService.getIsDeadly).toHaveBeenCalled();
    });
  });
});
