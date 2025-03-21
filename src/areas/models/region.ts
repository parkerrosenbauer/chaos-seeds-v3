import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Identifiable } from 'src/common/interfaces';
import { Biome } from './biome';
import { Area } from './area';

@Table
export class Region
  extends Model<Region, Partial<Region>>
  implements Identifiable
{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull(false)
  @Column
  declare description: string;

  @BelongsToMany(() => Biome, () => Area)
  declare biomes?: Biome[];
}
