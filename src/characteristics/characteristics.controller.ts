import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { CharacteristicsService } from "./characteristics.service";

@Controller("characteristics")
export class CharacteristicsController {
  constructor(
    private readonly characteristicsService: CharacteristicsService
  ) {}

  @Get("ability/:id")
  async getAbilityById(@Param("id", ParseIntPipe) id: number) {
    return await this.characteristicsService.getAbilityById(id);
  }

  @Get("race/:id")
  async getRace(@Param("id", ParseIntPipe) id: number) {
    return await this.characteristicsService.getRaceById(id);
  }

  @Get("language/:id")
  async getLanguageById(@Param("id", ParseIntPipe) id: number) {
    return await this.characteristicsService.getLanguageById(id);
  }
}
