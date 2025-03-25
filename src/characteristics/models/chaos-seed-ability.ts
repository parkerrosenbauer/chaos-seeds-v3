import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { ChaosSeed } from "../../chaos-seeds/models";
import { Ability } from "./ability";

@Table
export class ChaosSeedAbility extends Model<
  ChaosSeedAbility,
  Partial<ChaosSeedAbility>
> {
  @ForeignKey(() => ChaosSeed)
  @Column
  declare chaosSeedId: number;

  @ForeignKey(() => Ability)
  @Column
  declare abilityId: number;
}
