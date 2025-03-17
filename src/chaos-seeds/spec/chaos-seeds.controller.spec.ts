import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedsController } from '../chaos-seeds.controller';
import { AREA } from './test-data';
import { AreasService } from 'src/areas/areas.service';
import { ChaosSeedsService } from '../chaos-seeds.service';

describe('ChaosSeedsController', () => {
  let controller: ChaosSeedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChaosSeedsController],
      providers: [
        {
          provide: AreasService,
          useValue: {
            getRandom: jest.fn().mockReturnValue(AREA),
            getIsDeadly: jest.fn().mockReturnValue(false),
          },
        },
        {
          provide: ChaosSeedsService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ChaosSeedsController>(ChaosSeedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
