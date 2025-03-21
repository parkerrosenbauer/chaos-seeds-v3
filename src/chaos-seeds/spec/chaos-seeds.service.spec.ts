import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedsService } from '../chaos-seeds.service';
import { AREA, CHAOS_SEED } from './test-data';
import { AreasService } from 'src/areas/areas.service';
import { ChaosSeed } from '../models/chaos-seed';
import { getModelToken } from '@nestjs/sequelize';
import { ChaosSeedName } from '../value-objects';

describe('ChaosSeedsService', () => {
  let service: ChaosSeedsService;
  const mockChaosSeed = {
    findByPk: jest.fn().mockResolvedValue(CHAOS_SEED),
    create: jest.fn().mockResolvedValue({ id: 1, isDeadOnArrival: false }),
  };
  const mockAreaService = {
    getRandom: jest.fn().mockResolvedValue(AREA),
    getIsDeadly: jest.fn().mockResolvedValue(false),
    getName: jest.fn().mockResolvedValue({
      regionName: 'region',
      biomeName: 'biome',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChaosSeedsService,
        {
          provide: getModelToken(ChaosSeed),
          useValue: mockChaosSeed,
        },
        {
          provide: AreasService,
          useValue: mockAreaService,
        },
      ],
    }).compile();

    service = module.get<ChaosSeedsService>(ChaosSeedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new chaos seed', async () => {
      const chaosSeed = await service.create();
      expect(chaosSeed).toEqual(CHAOS_SEED);
      expect(mockChaosSeed.create).toHaveBeenCalled();
    });

    it('should get a random area, its name and if it is deadly', async () => {
      service.create();
      expect(mockAreaService.getRandom).toHaveBeenCalled();
      expect(mockAreaService.getName).toHaveBeenCalled();
      expect(mockAreaService.getIsDeadly).toHaveBeenCalled();
    });
  });

  describe('patchName', () => {
    it('should return the cleaned chaos seed name', async () => {
      const chaosSeedNameReq = { name: 'Heman_123' };
      const mockChaosSeedInstance = {
        ...CHAOS_SEED,
        save: jest.fn(),
        set name(value: string) {
          this._name = value
            .replace(/[^a-zA-Z]/g, '')
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(' ');
        },
        get name() {
          return this._name;
        },
      };
      mockChaosSeedInstance.name = 'Unknown';
      mockChaosSeed.findByPk.mockResolvedValue(mockChaosSeedInstance);

      const chaosSeedName = await service.patchName(1, chaosSeedNameReq);

      expect(chaosSeedName).toEqual({ name: 'Heman' });
      expect(mockChaosSeed.findByPk).toHaveBeenCalled();
      expect(mockChaosSeedInstance.save).toHaveBeenCalled();
    });

    it('should throw an error if the chaos seed is dead on arrival', async () => {
      const mockChaosSeedInstance = {
        ...CHAOS_SEED,
        isDeadOnArrival: true,
        save: jest.fn(),
      };
      mockChaosSeed.findByPk.mockResolvedValue(mockChaosSeedInstance);

      const chaosSeedNameReq = { name: 'Heman_123' };

      await expect(service.patchName(1, chaosSeedNameReq)).rejects.toThrow(
        'Cannot update name of a dead chaos seed',
      );

      expect(mockChaosSeed.findByPk).toHaveBeenCalledWith(1);
      expect(mockChaosSeedInstance.save).not.toHaveBeenCalled();
    });

    it('should throw an error if the chaos seed is not found', async () => {
      mockChaosSeed.findByPk.mockResolvedValue(null);

      const chaosSeedNameReq = { name: 'Heman_123' };

      await expect(service.patchName(1, chaosSeedNameReq)).rejects.toThrow(
        'Chaos seed not found',
      );

      expect(mockChaosSeed.findByPk).toHaveBeenCalledWith(1);
    });
  });
});
