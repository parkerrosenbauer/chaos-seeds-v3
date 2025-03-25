import {
  Model,
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { Identifiable } from "src/common/interfaces";
import { Race } from "./race";
import { ChaosSeed } from "../../chaos-seeds/models";
import { ChaosSeedLanguage } from "./chaos-seed-language";

@Table
export class Language
  extends Model<Language, Partial<Language>>
  implements Identifiable
{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  declare name: string;

  @BelongsToMany(() => ChaosSeed, () => ChaosSeedLanguage)
  declare chaosSeeds: ChaosSeed[];

  @HasMany(() => Race)
  declare races?: Race[];
}
