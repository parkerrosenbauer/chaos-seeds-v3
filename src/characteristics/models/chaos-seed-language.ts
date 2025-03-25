import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { ChaosSeed } from "../../chaos-seeds/models";
import { Language } from "./language";

@Table
export class ChaosSeedLanguage extends Model<
  ChaosSeedLanguage,
  Partial<ChaosSeedLanguage>
> {
  @ForeignKey(() => ChaosSeed)
  @Column
  declare chaosSeedId: number;

  @ForeignKey(() => Language)
  @Column
  declare languageId: number;
}
