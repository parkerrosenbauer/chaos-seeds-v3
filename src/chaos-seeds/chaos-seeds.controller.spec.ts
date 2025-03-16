import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedsController } from './chaos-seeds.controller';

describe('ChaosSeedsController', () => {
  let controller: ChaosSeedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChaosSeedsController],
    }).compile();

    controller = module.get<ChaosSeedsController>(ChaosSeedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
