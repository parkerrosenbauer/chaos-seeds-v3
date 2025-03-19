import { Test, TestingModule } from '@nestjs/testing';
import { AreasService } from '../areas.service';
import { AREAS, BIOMES, REGIONS } from './test-data';

describe('AreasService', () => {
  let service: AreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AreasService,
        { provide: 'AREAS', useValue: AREAS },
        { provide: 'BIOMES', useValue: BIOMES },
        { provide: 'REGIONS', useValue: REGIONS },
      ],
    }).compile();

    service = module.get<AreasService>(AreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRandom', () => {
    it('should return a random area', () => {
      const randomArea = service.getRandom();
      expect(AREAS).toContain(randomArea);
    });
  });

  describe('getById', () => {
    it('should return an area by id', () => {
      expect(service.getById(1)).toEqual(AREAS[0]);
    });

    it('should throw an error if area is not found', () => {
      expect(() => service.getById(100)).toThrow('Area not found');
    });
  });

  describe('getBiome', () => {
    it('should return a biome by id', () => {
      expect(service.getBiome(1)).toEqual(BIOMES[0]);
    });

    it('should throw an error if biome is not found', () => {
      expect(() => service.getBiome(100)).toThrow('Biome not found');
    });
  });

  describe('getRegion', () => {
    it('should return a region by id', () => {
      expect(service.getRegion(1)).toEqual(REGIONS[0]);
    });

    it('should throw an error if region is not found', () => {
      expect(() => service.getRegion(100)).toThrow('Region not found');
    });
  });

  describe('getName', () => {
    it('should return the name of an area', () => {
      expect(service.getName(1)).toEqual({
        regionName: REGIONS[0].name,
        biomeName: BIOMES[0].name,
      });
    });

    it('should throw an error if area is not found', () => {
      expect(() => service.getName(100)).toThrow('Area not found');
    });
  });

  describe('getAll', () => {
    it('should return all areas', () => {
      expect(service.getAll()).toEqual(AREAS);
    });
  });

  describe('getIsDeadly', () => {
    it('should return true if biome is deadly', () => {
      expect(service.getIsDeadly(2)).toBe(true);
    });

    it('should return false if biome is not deadly', () => {
      expect(service.getIsDeadly(1)).toBe(false);
    });
  });
});
