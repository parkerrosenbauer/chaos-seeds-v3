import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedsController } from '../chaos-seeds.controller';
import { AREA, CHAOS_SEED } from './test-data';
import { AreasService } from 'src/areas/areas.service';
import { ChaosSeedsService } from '../chaos-seeds.service';

describe('ChaosSeedsController', () => {
  let controller: ChaosSeedsController;
  const chaosSeedsService = {
    create: jest.fn().mockResolvedValue(CHAOS_SEED),
  };
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

  it('should create a new chaos seed', () => {
    const chaosSeed = controller.create();
    expect(chaosSeed).resolves.toEqual(CHAOS_SEED);
    expect(chaosSeedsService.create).toHaveBeenCalled();
  });
});
