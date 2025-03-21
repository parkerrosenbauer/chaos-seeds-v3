import { Test, TestingModule } from '@nestjs/testing';
import { AreasController } from '../areas.controller';
import { AREAS } from './test-data';
import { AreasService } from '../areas.service';

describe('AreasController', () => {
  let controller: AreasController;
  const mockAreasService = {
    getById: jest.fn().mockResolvedValue(AREAS[1]),
    getRandom: jest.fn().mockResolvedValue(AREAS[0]),
    getAll: jest.fn().mockResolvedValue(AREAS),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreasController],
      providers: [
        {
          provide: AreasService,
          useValue: mockAreasService,
        },
      ],
    }).compile();

    controller = module.get<AreasController>(AreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRandom', () => {
    it('should return a random area', async () => {
      expect(controller.getRandom()).resolves.toEqual(AREAS[0]);
      expect(mockAreasService.getRandom).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return an area by id', async () => {
      expect(controller.getById(1)).resolves.toEqual(AREAS[1]);
      expect(mockAreasService.getById).toHaveBeenCalled();
      expect(mockAreasService.getById).toHaveBeenCalledWith(1);
    });
  });

  describe('getAll', () => {
    it('should return all areas', async () => {
      expect(controller.getAll()).resolves.toEqual(AREAS);
      expect(mockAreasService.getAll).toHaveBeenCalled();
    });
  });
});
