import { Test, TestingModule } from '@nestjs/testing';
import { AreasController } from '../areas.controller';
import { AREAS } from './test-data';
import { AreasService } from '../areas.service';

describe('AreasController', () => {
  let controller: AreasController;
  let service: AreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreasController],
      providers: [
        {
          provide: AreasService,
          useValue: {
            getById: jest.fn().mockReturnValue(AREAS[1]),
            getRandom: jest.fn().mockReturnValue(AREAS[0]),
            getAll: jest.fn().mockReturnValue(AREAS),
          },
        },
      ],
    }).compile();

    controller = module.get<AreasController>(AreasController);
    service = module.get<AreasService>(AreasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRandom', () => {
    it('should return a random area', () => {
      expect(controller.getRandom()).toBeDefined();
      expect(controller.getRandom()).toEqual(AREAS[0]);
      expect(service.getRandom).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return an area by id', () => {
      expect(controller.getById(1)).toBeDefined();
      expect(controller.getById(1)).toEqual(AREAS[1]);
      expect(service.getById).toHaveBeenCalled();
      expect(service.getById).toHaveBeenCalledWith(1);
    });
  });

  describe('getAll', () => {
    it('should return all areas', () => {
      expect(controller.getAll()).toBeDefined();
      expect(controller.getAll()).toEqual(AREAS);
      expect(service.getAll).toHaveBeenCalled();
    });
  });
});
