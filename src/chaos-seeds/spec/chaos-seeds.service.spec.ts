import { Test, TestingModule } from "@nestjs/testing";
import { ChaosSeedsService } from "../chaos-seeds.service";
import {
  ABILITY,
  AREA,
  CHAOS_SEED,
  CHAOS_SEED_DTO,
  COMMON,
  LANGUAGE,
  RACE,
} from "./test-data";
import { AreasService } from "src/areas/areas.service";
import { ChaosSeed } from "../models/chaos-seed";
import { getModelToken } from "@nestjs/sequelize";
import { Ability, Language, Race } from "src/characteristics/models";
import { Sequelize } from "sequelize-typescript";

describe("ChaosSeedsService", () => {
  let service: ChaosSeedsService;
  const mockTransaction = {
    commit: jest.fn(),
    rollback: jest.fn(),
    afterCommit: jest.fn(),
  };
  const mockSequelize = {
    transaction: jest.fn().mockImplementation(async (callback) => {
      return callback ? callback(mockTransaction) : mockTransaction;
    }),
  };
  const mockChaosSeedInstance = {
    ...CHAOS_SEED,
    save: jest.fn().mockResolvedValue(null),
    set name(value: string) {
      this._name = value
        .replace(/[^a-zA-Z]/g, "")
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");
    },
    get name() {
      return this._name;
    },
    set: jest.fn(),
    $set: jest.fn(),
    $add: jest.fn(),
    $get: jest.fn().mockImplementation((relation) => {
      if (relation === "abilities") return Promise.resolve([ABILITY]);
      if (relation === "race") return Promise.resolve(RACE);
      if (relation === "languages") return Promise.resolve([COMMON, LANGUAGE]);
      return Promise.resolve(null);
    }),
  };
  const mockChaosSeed = {
    findByPk: jest.fn().mockResolvedValue(mockChaosSeedInstance),
    findAll: jest.fn().mockResolvedValue([mockChaosSeedInstance]),
    create: jest.fn().mockResolvedValue({ id: 1, isDeadOnArrival: false }),
  };
  const mockAbility = {
    findAll: jest.fn().mockResolvedValue([ABILITY]),
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
  };
  const mockAreaService = {
    getRandom: jest.fn().mockResolvedValue(AREA),
    getIsDeadly: jest.fn().mockResolvedValue(false),
    getName: jest.fn().mockResolvedValue({
      regionName: "region",
      biomeName: "biome",
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
        {
          provide: AreasService,
          useValue: mockAreaService,
        },
        {
          provide: Sequelize,
          useValue: mockSequelize,
        },
      ],
    }).compile();

    service = module.get<ChaosSeedsService>(ChaosSeedsService);
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new chaos seed", async () => {
      const chaosSeed = await service.create();
      expect(chaosSeed).toEqual(CHAOS_SEED_DTO);
      expect(mockChaosSeed.create).toHaveBeenCalled();
    });

    it("should get a random area, its name and if it is deadly", async () => {
      await service.create();
      expect(mockAreaService.getRandom).toHaveBeenCalled();
      expect(mockAreaService.getName).toHaveBeenCalled();
      expect(mockAreaService.getIsDeadly).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return the chaos seed by id", async () => {
      const chaosSeed = await service.getById(1);
      expect(chaosSeed).toEqual(mockChaosSeedInstance);
      expect(mockChaosSeed.findByPk).toHaveBeenCalledWith(1);
    });

    it("should throw an error if chaos seed is not found", async () => {
      mockChaosSeed.findByPk.mockResolvedValue(null);

      await expect(service.getById(1)).rejects.toThrow("Chaos seed not found");
      expect(mockChaosSeed.findByPk).toHaveBeenCalledWith(1);
    });
  });

  describe("getAll", () => {
    it("should return all chaos seeds", async () => {
      const chaosSeeds = await service.getAll();
      expect(chaosSeeds).toEqual([mockChaosSeedInstance]);
      expect(mockChaosSeed.findAll).toHaveBeenCalled();
    });
  });

  describe("getAbilities", () => {
    it("should return the abilities of a chaos seed", async () => {
      mockChaosSeed.findByPk.mockResolvedValue(mockChaosSeedInstance);
      const abilities = await service.getAbilities(1);
      expect(abilities).toEqual([ABILITY]);
    });
  });

  describe("getRace", () => {
    it("should return the race of a chaos seed", async () => {
      const race = await service.getRace(1);
      expect(race).toEqual(RACE);
    });
  });

  describe("getLanguages", () => {
    it("should return the languages of a chaos seed", async () => {
      const languages = await service.getLanguages(1);
      expect(languages).toEqual([COMMON, LANGUAGE]);
    });
  });

  describe("patchSelf", () => {
    it("should return the new chaos seed name", async () => {
      const chaosSeedNameReq = { name: "Heman_123" };
      mockChaosSeedInstance.save = jest
        .fn()
        .mockResolvedValue({ ...mockChaosSeedInstance, name: "Heman" });

      const chaosSeedName = await service.patchSelf(1, chaosSeedNameReq);

      expect(chaosSeedName).toEqual({ name: "Heman" });
      expect(mockChaosSeed.findByPk).toHaveBeenCalled();
      expect(mockRace.findAll).toHaveBeenCalled();
      expect(mockChaosSeedInstance.save).toHaveBeenCalled();
      expect(mockSequelize.transaction).toHaveBeenCalled();
    });

    it("should assign a random race to a chaos seed", async () => {
      const getRandomRaceSpy = jest.spyOn(service, "getRandomRace");
      const chaosSeedNameReq = { name: "Heman_123" };
      await service.patchSelf(1, chaosSeedNameReq);
      const chaosSeedRace = await mockChaosSeedInstance.$get("race");

      expect(chaosSeedRace).toEqual(RACE);
      expect(getRandomRaceSpy).toHaveBeenCalled();
      expect(mockRace.findAll).toHaveBeenCalled();
    });

    it("should assign a random ability to a chaos seed", async () => {
      const getRandomAbilitySpy = jest.spyOn(service, "getRandomAbility");
      const chaosSeedNameReq = { name: "Heman_123" };

      await service.patchSelf(1, chaosSeedNameReq);
      const chaosSeedAbilities = await mockChaosSeedInstance.$get("abilities");

      expect(chaosSeedAbilities).toEqual([ABILITY]);
      expect(getRandomAbilitySpy).toHaveBeenCalled();
      expect(mockAbility.findAll).toHaveBeenCalled();
    });

    it("should assign common and a racial language to a chaos seed", async () => {
      const getRacialLanguageSpy = jest.spyOn(service, "getRacialLanguage");
      const chaosSeedNameReq = { name: "Heman_123" };

      await service.patchSelf(1, chaosSeedNameReq);
      const chaosSeedLanguages = await mockChaosSeedInstance.$get("languages");

      expect(chaosSeedLanguages).toEqual([COMMON, LANGUAGE]);
      expect(getRacialLanguageSpy).toHaveBeenCalled();
      expect(mockLanguage.findOne).toHaveBeenCalled();
    });

    it("should throw an error if the chaos seed is dead on arrival", async () => {
      const mockChaosSeedInstance = {
        ...CHAOS_SEED_DTO,
        isDeadOnArrival: true,
        save: jest.fn(),
      };
      mockChaosSeed.findByPk.mockResolvedValue(mockChaosSeedInstance);

      const chaosSeedNameReq = { name: "Heman_123" };

      await expect(service.patchSelf(1, chaosSeedNameReq)).rejects.toThrow(
        "Cannot initialize dead chaos seed"
      );

      expect(mockChaosSeed.findByPk).toHaveBeenCalledWith(1);
      expect(mockChaosSeedInstance.save).not.toHaveBeenCalled();
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
});
