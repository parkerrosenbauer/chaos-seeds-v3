import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Area } from './models/area';
import { AREAS, BIOMES, REGIONS } from './spec/test-data';
import { randomChance } from '../common/utils';
import { Biome } from './models/biome';
import { Region } from './models/region';
import { AreaNameDto } from './dtos';

@Injectable()
export class AreasService {
  constructor(
    @Inject('AREAS') private areas: Area[],
    @Inject('BIOMES') private biomes: Biome[],
    @Inject('REGIONS') private regions: Region[],
  ) {
    this.areas = AREAS;
    this.biomes = BIOMES;
    this.regions = REGIONS;
  }

  getById(id: number) {
    const area = this.areas.find((area) => area.id === id);
    if (!area) {
      throw new NotFoundException('Area not found');
    }
    return area;
  }

  getRandom() {
    return randomChance(this.areas);
  }

  getBiome(biomeId: number) {
    const biome = this.biomes.find((biome) => biome.id === biomeId);
    if (!biome) {
      throw new NotFoundException('Biome not found');
    }
    return biome;
  }

  getRegion(regionId: number) {
    const region = this.regions.find((region) => region.id === regionId);
    if (!region) {
      throw new NotFoundException('Region not found');
    }
    return region;
  }

  getName(id: number): AreaNameDto {
    const area = this.getById(id);
    const regionName = this.getRegion(area.regionId).name;
    const biomeName = this.getBiome(area.biomeId).name;
    return {
      regionName: regionName,
      biomeName: biomeName,
    };
  }

  getIsDeadly(id: number) {
    const area = this.getById(id);
    const biome = this.getBiome(area.biomeId);
    return biome.isDeadly;
  }

  getAll() {
    return this.areas;
  }
}
