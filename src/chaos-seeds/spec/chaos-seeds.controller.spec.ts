import { Test, TestingModule } from "@nestjs/testing";
import { ChaosSeedsController } from "../chaos-seeds.controller";
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
import { ChaosSeedsService } from "../chaos-seeds.service";

describe("ChaosSeedsController", () => {
  let controller: ChaosSeedsController;
  const chaosSeedsService = {
    create: jest.fn().mockResolvedValue(CHAOS_SEED_DTO),
    getById: jest.fn().mockResolvedValue(CHAOS_SEED),
    getAll: jest.fn().mockResolvedValue([CHAOS_SEED]),
    patchSelf: jest.fn().mockResolvedValue({ name: "Heman" }),
  };
  const areasService = {
    getRandom: jest.fn().mockResolvedValue(AREA),
    getIsDeadly: jest.fn().mockResolvedValue(false),
    getName: jest.fn().mockResolvedValue({
      regionName: "region",
      biomeName: "biome",
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChaosSeedsController],
      providers: [
        {
          provide: AreasService,
          useValue: areasService,
        },
        {
          provide: ChaosSeedsService,
          useValue: chaosSeedsService,
        },
      ],
    }).compile();

    controller = module.get<ChaosSeedsController>(ChaosSeedsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a new chaos seed", () => {
      const chaosSeed = controller.create();
      expect(chaosSeed).resolves.toEqual(CHAOS_SEED_DTO);
      expect(chaosSeedsService.create).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return a chaos seed by id", () => {
      const chaosSeed = controller.getById(1);
      expect(chaosSeed).resolves.toEqual(CHAOS_SEED);
      expect(chaosSeedsService.getById).toHaveBeenCalled();
    });
  });

  describe("getAll", () => {
    it("should return all chaos seeds", () => {
      const chaosSeeds = controller.getAll();
      expect(chaosSeeds).resolves.toEqual([CHAOS_SEED]);
      expect(chaosSeedsService.getAll).toHaveBeenCalled();
    });
  });

  describe("patchSelf", () => {
    it("should returned the cleaned chaos seed name", () => {
      const chaosSeedNameReq = { name: "Heman_123" };
      const chaosSeedName = controller.patchSelf(1, chaosSeedNameReq);
      expect(chaosSeedName).resolves.toEqual({ name: "Heman" });
      expect(chaosSeedsService.patchSelf).toHaveBeenCalled();
    });
  });
});
