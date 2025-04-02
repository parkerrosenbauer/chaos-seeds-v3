import { Test, TestingModule } from "@nestjs/testing";
import { CharacteristicsService } from "../characteristics.service";
import { ABILITY, CHAOS_SEED, COMMON, LANGUAGE, RACE } from "./test-data";
import { getModelToken } from "@nestjs/sequelize";
import { ChaosSeed } from "../../chaos-seeds/models";
import { Ability, Language, Race } from "../models";
import { ChaosSeedsService } from "../../chaos-seeds/chaos-seeds.service";

describe("CharacteristicsService", () => {
  let service: CharacteristicsService;
  const mockAbility = {
    findAll: jest.fn().mockResolvedValue([ABILITY]),
    findByPk: jest.fn().mockResolvedValue(ABILITY),
  };
  const mockRaceInstance = {
    ...RACE,
    $get: jest.fn().mockResolvedValue(LANGUAGE),
  };
  const mockRace = {
    findByPk: jest.fn().mockResolvedValue(mockRaceInstance),
    findAll: jest.fn().mockResolvedValue([mockRaceInstance]),
  };
  const mockLanguage = {
    findOne: jest.fn().mockResolvedValue(COMMON),
    findByPk: jest.fn().mockResolvedValue(LANGUAGE),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacteristicsService,
        {
          provide: getModelToken(ChaosSeed),
          useValue: {},
        },
        {
          provide: getModelToken(Ability),
          useValue: mockAbility,
        },
        {
          provide: getModelToken(Race),
          useValue: mockRace,
        },
        {
          provide: getModelToken(Language),
          useValue: mockLanguage,
        },
      ],
    }).compile();

    service = module.get<CharacteristicsService>(CharacteristicsService);
  });

  describe("getAbilityById", () => {
    it("should return an ability", async () => {
      const abilities = await service.getAbilityById(1);
      expect(abilities).toEqual(ABILITY);
    });
  });

  describe("getRaceById", () => {
    it("should return a race", async () => {
      const race = await service.getRaceById(1);
      expect(race).toEqual(mockRaceInstance);
    });
  });

  describe("getLanguageById", () => {
    it("should return a language", async () => {
      const languages = await service.getLanguageById(1);
      expect(languages).toEqual(LANGUAGE);
    });
  });

  describe("getRandomAbility", () => {
    it("should return a random ability", async () => {
      const ability = await service.getRandomAbility();
      expect(ability).toEqual(ABILITY);
      expect(mockAbility.findAll).toHaveBeenCalled();
    });
  });

  describe("getRandomRace", () => {
    it("should return a random race", async () => {
      const race = await service.getRandomRace();
      expect(race).toEqual(mockRaceInstance);
      expect(mockRace.findAll).toHaveBeenCalled();
    });
  });

  describe("getRacialLanguage", () => {
    it("should return the racial language if it exists", async () => {
      const racialLanguage = await service.getRacialLanguage(1);
      expect(racialLanguage).toEqual(LANGUAGE);
    });
  });

  describe("getCommonLanguage", () => {
    it("should return the common language", async () => {
      const commonLanguage = await service.getCommonLanguage();
      expect(commonLanguage).toEqual(COMMON);
      expect(mockLanguage.findOne).toHaveBeenCalledWith({
        where: { name: "Common" },
      });
    });
  });
});
