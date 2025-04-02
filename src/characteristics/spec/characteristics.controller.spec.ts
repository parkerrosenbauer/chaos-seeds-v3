import { Test, TestingModule } from "@nestjs/testing";
import { CharacteristicsController } from "../characteristics.controller";
import { ABILITY, LANGUAGE, RACE } from "./test-data";
import { CharacteristicsService } from "../characteristics.service";

describe("CharacteristicsController", () => {
  let controller: CharacteristicsController;
  const mockCharacteristicsService = {
    getAbilityById: jest.fn().mockResolvedValue(ABILITY),
    getRaceById: jest.fn().mockResolvedValue(RACE),
    getLanguageById: jest.fn().mockResolvedValue(LANGUAGE),
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

  describe("getAbilityById", () => {
    it("should return all abilities for a chaos seed", () => {
      const ability = controller.getAbilityById(1);
      expect(ability).resolves.toEqual(ABILITY);
      expect(mockCharacteristicsService.getAbilityById).toHaveBeenCalled();
    });
  });

  describe("getRace", () => {
    it("should return the race of a chaos seed", () => {
      const race = controller.getRace(1);
      expect(race).resolves.toEqual(RACE);
      expect(mockCharacteristicsService.getRaceById).toHaveBeenCalled();
    });
  });

  describe("getLanguageById", () => {
    it("should return all languages for a chaos seed", () => {
      const language = controller.getLanguageById(1);
      expect(language).resolves.toEqual(LANGUAGE);
      expect(mockCharacteristicsService.getLanguageById).toHaveBeenCalled();
    });
  });
});
