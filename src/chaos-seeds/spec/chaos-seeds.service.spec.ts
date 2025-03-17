import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedsService } from '../chaos-seeds.service';
import { AREA, CHAOS_SEED } from './test-data';
import { AreasService } from 'src/areas/areas.service';
import { AreasModule } from 'src/areas/areas.module';

describe('ChaosSeedsService', () => {
  let service: ChaosSeedsService;
  const areasService = {
    getRandom: jest.fn().mockReturnValue(AREA),
    getIsDeadly: jest.fn().mockReturnValue(false),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AreasModule],
      providers: [ChaosSeedsService, AreasService],
    })
      .overrideProvider(AreasService)
      .useValue(areasService)
      .compile();

    service = module.get<ChaosSeedsService>(ChaosSeedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new chaos seed', () => {
      service.create();
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveReturnedWith(CHAOS_SEED);
      expect(areasService.getRandom).toHaveBeenCalled();
      expect(areasService.getIsDeadly).toHaveBeenCalled();
    });
  });
});
