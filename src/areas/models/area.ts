import { Identifiable, Randomizable } from 'src/common/interfaces';

export class Area implements Identifiable, Randomizable {
  declare regionId: number;

  declare biomeId: number;

  declare id: number;

  declare chance: number;
}
