import {
  Model,
  AllowNull,
  AutoIncrement,
  Column,
  ForeignKey,
  PrimaryKey,
  Table,
  HasMany,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { Identifiable, Randomizable } from "src/common/interfaces";
import { Language } from "./language";
import { ChaosSeed } from "../../chaos-seeds/models";

@Table
export class Race
  extends Model<Race, Partial<Race>>
  implements Identifiable, Randomizable
{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING(1000))
  declare description: string;

  @AllowNull(false)
  @Column
  declare chance: number;

  @ForeignKey(() => Language)
  @Column
  declare languageId?: number;

  @BelongsTo(() => Language)
  declare language?: Language;

  @HasMany(() => ChaosSeed)
  declare chaosSeeds?: ChaosSeed[];
}
