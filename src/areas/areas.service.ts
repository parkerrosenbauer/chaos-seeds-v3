import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Area } from './models/area';
import { AREAS, BIOMES, REGIONS } from './spec/test-data';
import { randomChance } from '../common/utils';
import { Biome } from './models/biome';
import { Region } from './models/region';
import { AreaNameResponse } from './dtos';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AreasService {
  constructor(
    @InjectModel(Area) private areaModel: typeof Area,
    @InjectModel(Biome) private biomeModel: typeof Biome,
    @InjectModel(Region) private regionModel: typeof Region,
  ) {}

  async getById(id: number) {
    const area = await this.areaModel.findByPk(id);
    if (!area) {
      throw new NotFoundException('Area not found');
    }
    return area;
  }

  async getRandom() {
    const areas = await this.areaModel.findAll();
    if (!areas.length) {
      throw new NotFoundException('No areas found');
    }
    return randomChance<Area>(areas);
  }

  async getBiome(biomeId: number) {
    const biome = await this.biomeModel.findByPk(biomeId);
    if (!biome) {
      throw new NotFoundException('Biome not found');
    }
    return biome;
  }

  async getRegion(regionId: number) {
    const region = await this.regionModel.findByPk(regionId);
    if (!region) {
      throw new NotFoundException('Region not found');
    }
    return region;
  }

  async getName(id: number): Promise<AreaNameResponse> {
    const area = await this.getById(id);
    const region = await this.getRegion(area.regionId);
    const biome = await this.getBiome(area.biomeId);
    return {
      regionName: region.name,
      biomeName: biome.name,
    };
  }

  async getIsDeadly(id: number) {
    const area = await this.getById(id);
    const biome = await this.getBiome(area.biomeId);
    return biome.isDeadly;
  }

  async getAll() {
    return await this.areaModel.findAll();
  }
}
