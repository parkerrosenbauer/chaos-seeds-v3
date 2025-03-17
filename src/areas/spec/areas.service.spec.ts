import { Test, TestingModule } from '@nestjs/testing';
import { AreasService } from '../areas.service';
import { AREAS, BIOMES, REGIONS } from './test-data';

describe('AreasService', () => {
  let service: AreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AreasService,
          useValue: {
            getById: jest.fn().mockReturnValue(AREAS[1]),
            getRandom: jest.fn().mockReturnValue(AREAS[0]),
            getBiome: jest.fn().mockReturnValue(BIOMES[0]),
            getRegion: jest.fn().mockReturnValue(REGIONS[0]),
            getName: jest.fn().mockReturnValue({
              regionName: REGIONS[0].name,
              biomeName: BIOMES[0].name,
            }),
            getAll: jest.fn().mockReturnValue(AREAS),
          },
        },
      ],
    }).compile();

    service = module.get<AreasService>(AreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRandom', () => {
    it('should return a random area', () => {
      expect(service.getRandom()).toEqual(AREAS[0]);
    });
  });

  describe('getById', () => {
    it('should return an area by id', () => {
      expect(service.getById(1)).toEqual(AREAS[1]);
    });
  });

  describe('getBiome', () => {
    it('should return a biome by id', () => {
      expect(service.getBiome(1)).toEqual(BIOMES[0]);
    });
  });

  describe('getRegion', () => {
    it('should return a region by id', () => {
      expect(service.getRegion(1)).toEqual(REGIONS[0]);
    });
  });

  describe('getName', () => {
    it('should return the name of an area', () => {
      expect(service.getName(1)).toEqual({
        regionName: REGIONS[0].name,
        biomeName: BIOMES[0].name,
      });
    });
  });

  describe('getAll', () => {
    it('should return all areas', () => {
      expect(service.getAll()).toEqual(AREAS);
    });
  });
});
