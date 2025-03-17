import { Identifiable } from 'src/common/interfaces';

export class Region implements Identifiable {
  declare id: number;

  declare name: string;

  declare description: string;

  declare biomes?: string;
}
