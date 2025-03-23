import { Experienced } from '../interfaces';
import { Identifiable } from 'src/common/interfaces';
import { ChaosSeedName } from '../value-objects';
import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Area } from '../../areas/models/area';
import { Ability } from './ability';
import { ChaosSeedAbility } from './chaos-seed-ability';
import { Language } from './language';
import { ChaosSeedLanguage } from './chaos-seed-language';
import { Race } from './race';

@Table
export class ChaosSeed
  extends Model<ChaosSeed, Partial<ChaosSeed>>
  implements Experienced, Identifiable
{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 'Unknown',
    set(value: string | ChaosSeedName) {
      const cleanedName =
        value instanceof ChaosSeedName
          ? value.name
          : new ChaosSeedName(value).name;
      this.setDataValue('name', cleanedName);
    },
  })
  declare name: string;

  @Column({ defaultValue: false })
  declare isDeadOnArrival: boolean;

  @ForeignKey(() => Area)
  @Column
  declare startingAreaId: number;

  @BelongsTo(() => Area)
  declare startingArea: Area;

  @Column({ defaultValue: 1 })
  declare level: number;

  @Column({ defaultValue: 0 })
  declare xp: number;

  @Column({ defaultValue: 0 })
  declare alignment: number;

  @Column({ defaultValue: 'Level 1 Who are you again?' })
  declare reputation: string;

  @Column({ defaultValue: 100 })
  declare health: number;

  @Column({ defaultValue: 100 })
  declare mana: number;

  @Column({ defaultValue: 100 })
  declare stamina: number;

  @Column({ defaultValue: 10 })
  declare strength: number;

  @Column({ defaultValue: 10 })
  declare agility: number;

  @Column({ defaultValue: 10 })
  declare dexterity: number;

  @Column({ defaultValue: 10 })
  declare constitution: number;

  @Column({ defaultValue: 10 })
  declare endurance: number;

  @Column({ defaultValue: 10 })
  declare intelligence: number;

  @Column({ defaultValue: 10 })
  declare wisdom: number;

  @Column({ defaultValue: 10 })
  declare charisma: number;

  @Column({ defaultValue: 10 })
  declare luck: number;

  @Column({ defaultValue: 'None ' })
  declare resistances: string;

  @Column({ defaultValue: 'None ' })
  declare weaknesses: string;

  @Column({ defaultValue: 'None' })
  declare skills: string;

  @Column({ defaultValue: 'None' })
  declare marks: string;

  @BelongsToMany(() => Ability, () => ChaosSeedAbility)
  declare abilities?: Ability[];

  @BelongsToMany(() => Language, () => ChaosSeedLanguage)
  declare languages?: Language[];

  @ForeignKey(() => Race)
  @Column
  declare raceId?: number;

  @BelongsTo(() => Race)
  declare race?: Race;
}
