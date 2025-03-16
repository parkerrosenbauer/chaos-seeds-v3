import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedsService } from './chaos-seeds.service';

describe('ChaosSeedsService', () => {
  let service: ChaosSeedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChaosSeedsService],
    }).compile();

    service = module.get<ChaosSeedsService>(ChaosSeedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
