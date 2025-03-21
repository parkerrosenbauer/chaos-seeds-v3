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
import { Region } from './region';
import { Area } from './area';

@Table
export class Biome
  extends Model<Biome, Partial<Biome>>
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
  declare isDeadly: boolean;

  @BelongsToMany(() => Region, () => Area)
  declare regions?: Region[];
}
