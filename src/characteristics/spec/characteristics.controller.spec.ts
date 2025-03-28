import { Test, TestingModule } from "@nestjs/testing";
import { CharacteristicsController } from "../characteristics.controller";
import { ABILITY, COMMON, LANGUAGE, RACE } from "./test-data";
import { CharacteristicsService } from "../characteristics.service";

describe("CharacteristicsController", () => {
  let controller: CharacteristicsController;
  const mockCharacteristicsService = {
    getAbilities: jest.fn().mockResolvedValue([ABILITY]),
    getRace: jest.fn().mockResolvedValue(RACE),
    getLanguages: jest.fn().mockResolvedValue([COMMON, LANGUAGE]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacteristicsController],
      providers: [
        {
          provide: CharacteristicsService,
          useValue: mockCharacteristicsService,
        },
      ],
    }).compile();

    controller = module.get<CharacteristicsController>(
      CharacteristicsController
    );
  });

  describe("getAbilities", () => {
    it("should return all abilities for a chaos seed", () => {
      const abilities = controller.getAbilities(1);
      expect(abilities).resolves.toEqual([ABILITY]);
      expect(mockCharacteristicsService.getAbilities).toHaveBeenCalled();
    });
  });

  describe("getRace", () => {
    it("should return the race of a chaos seed", () => {
      const race = controller.getRace(1);
      expect(race).resolves.toEqual(RACE);
      expect(mockCharacteristicsService.getRace).toHaveBeenCalled();
    });
  });

  describe("getLanguages", () => {
    it("should return all languages for a chaos seed", () => {
      const languages = controller.getLanguages(1);
      expect(languages).resolves.toEqual([COMMON, LANGUAGE]);
      expect(mockCharacteristicsService.getLanguages).toHaveBeenCalled();
    });
  });
});
