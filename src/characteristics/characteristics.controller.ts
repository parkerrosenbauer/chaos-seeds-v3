import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { CharacteristicsService } from "./characteristics.service";

@Controller("characteristics")
export class CharacteristicsController {
  constructor(
    private readonly characteristicsService: CharacteristicsService
  ) {}

  @Get("abilities/:id")
  async getAbilities(@Param("id", ParseIntPipe) id: number) {
    return await this.characteristicsService.getAbilities(id);
  }

  @Get("race/:id")
  async getRace(@Param("id", ParseIntPipe) id: number) {
    return await this.characteristicsService.getRace(id);
  }

  @Get("languages/:id")
  async getLanguages(@Param("id", ParseIntPipe) id: number) {
    return await this.characteristicsService.getLanguages(id);
  }
}
