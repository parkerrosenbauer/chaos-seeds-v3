import { Identifiable } from 'src/common/interfaces';

export class Biome implements Identifiable {
  declare id: number;

  declare name: string;

  declare isDeadly: boolean;

  declare regions?: string;
}
