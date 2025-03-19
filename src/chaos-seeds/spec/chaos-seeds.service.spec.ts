import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedsService } from '../chaos-seeds.service';
import { AREA, CHAOS_SEED } from './test-data';
import { AreasService } from 'src/areas/areas.service';

describe('ChaosSeedsService', () => {
  let service: ChaosSeedsService;
  const areasService = {
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
          provide: AreasService,
          useValue: areasService,
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
      expect(chaosSeed).toEqual(CHAOS_SEED);
      expect(areasService.getRandom).toHaveBeenCalled();
      expect(areasService.getIsDeadly).toHaveBeenCalled();
    });
  });
});
