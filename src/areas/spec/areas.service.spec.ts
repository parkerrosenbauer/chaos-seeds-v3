import { Test, TestingModule } from '@nestjs/testing';
import { AreasService } from '../areas.service';
import { AREAS, BIOMES, REGIONS } from './test-data';
import { Area, Biome, Region } from '../models';
import { getModelToken } from '@nestjs/sequelize';

describe('AreasService', () => {
  let service: AreasService;

  const mockArea = {
    findByPk: jest.fn().mockResolvedValue(AREAS[0]),
    findAll: jest.fn().mockResolvedValue(AREAS),
  };
  const mockBiome = {
    findByPk: jest.fn().mockResolvedValue(BIOMES[0]),
  };
  const mockRegion = {
    findByPk: jest.fn().mockResolvedValue(REGIONS[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AreasService,
        {
          provide: getModelToken(Area),
          useValue: mockArea,
        },
        {
          provide: getModelToken(Biome),
          useValue: mockBiome,
        },
        {
          provide: getModelToken(Region),
          useValue: mockRegion,
        },
      ],
    }).compile();

    service = module.get<AreasService>(AreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRandom', () => {
    it('should return a random area', async () => {
      const randomArea = await service.getRandom();
      expect(AREAS).toContain(randomArea);
      expect(mockArea.findAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return an area by id', async () => {
      const area = await service.getById(1);
      expect(area).toEqual(AREAS[0]);
      expect(mockArea.findByPk).toHaveBeenCalledWith(1);
    });

    it('should throw an error if area is not found', async () => {
      jest.spyOn(mockArea, 'findByPk').mockResolvedValue(null);
      await expect(service.getById(100)).rejects.toThrow('Area not found');
    });
  });

  describe('getBiome', () => {
    it('should return a biome by id', async () => {
      const biome = await service.getBiome(1);
      expect(biome).toEqual(BIOMES[0]);
      expect(mockBiome.findByPk).toHaveBeenCalledWith(1);
    });

    it('should throw an error if biome is not found', async () => {
      jest.spyOn(mockBiome, 'findByPk').mockResolvedValue(null);
      await expect(service.getBiome(100)).rejects.toThrow('Biome not found');
    });
  });

  describe('getRegion', () => {
    it('should return a region by id', async () => {
      const region = await service.getRegion(1);
      expect(region).toEqual(REGIONS[0]);
      expect(mockRegion.findByPk).toHaveBeenCalledWith(1);
    });

    it('should throw an error if region is not found', async () => {
      jest.spyOn(mockRegion, 'findByPk').mockResolvedValue(null);
      await expect(service.getRegion(100)).rejects.toThrow('Region not found');
    });
  });

  describe('getName', () => {
    it('should return the name of an area', async () => {
      jest.spyOn(mockArea, 'findByPk').mockResolvedValue(AREAS[0]);
      jest.spyOn(mockRegion, 'findByPk').mockResolvedValue(REGIONS[0]);
      jest.spyOn(mockBiome, 'findByPk').mockResolvedValue(BIOMES[0]);
      const name = await service.getName(1);
      expect(name).toEqual({
        regionName: REGIONS[0].name,
        biomeName: BIOMES[0].name,
      });
      expect(mockArea.findByPk).toHaveBeenCalledWith(1);
      expect(mockRegion.findByPk).toHaveBeenCalledWith(AREAS[0].regionId);
      expect(mockBiome.findByPk).toHaveBeenCalledWith(AREAS[0].biomeId);
    });

    it('should throw an error if area is not found', async () => {
      jest.spyOn(mockArea, 'findByPk').mockResolvedValue(null);
      await expect(service.getName(100)).rejects.toThrow('Area not found');
    });
  });

  describe('getIsDeadly', () => {
    it('should return true if biome is deadly', async () => {
      jest.spyOn(mockArea, 'findByPk').mockResolvedValue(AREAS[1]);
      jest.spyOn(mockBiome, 'findByPk').mockResolvedValue(BIOMES[1]);
      const isDeadly = await service.getIsDeadly(2);
      expect(isDeadly).toBe(true);
      expect(mockArea.findByPk).toHaveBeenCalledWith(2);
      expect(mockBiome.findByPk).toHaveBeenCalledWith(AREAS[1].biomeId);
    });

    it('should return false if biome is not deadly', async () => {
      jest.spyOn(mockArea, 'findByPk').mockResolvedValue(AREAS[0]);
      jest.spyOn(mockBiome, 'findByPk').mockResolvedValue(BIOMES[0]);
      const isDeadly = await service.getIsDeadly(1);
      expect(isDeadly).toBe(false);
      expect(mockArea.findByPk).toHaveBeenCalledWith(1);
      expect(mockBiome.findByPk).toHaveBeenCalledWith(AREAS[0].biomeId);
    });
  });

  describe('getAll', () => {
    it('should return all areas', async () => {
      const areas = await service.getAll();
      expect(areas).toEqual(AREAS);
      expect(mockArea.findAll).toHaveBeenCalled();
    });
  });
});
