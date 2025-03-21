import {
  AllowNull,
  AutoIncrement,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Identifiable, Randomizable } from 'src/common/interfaces';
import { Region } from './region';
import { Biome } from './biome';
import { ChaosSeed } from '../../chaos-seeds/models/chaos-seed';

@Table
export class Area
  extends Model<Area, Partial<Area>>
  implements Identifiable, Randomizable
{
  @ForeignKey(() => Region)
  @Column
  declare regionId: number;

  @ForeignKey(() => Biome)
  @Column
  declare biomeId: number;

  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  declare chance: number;

  @HasMany(() => ChaosSeed)
  chaosSeeds?: ChaosSeed[];
}
