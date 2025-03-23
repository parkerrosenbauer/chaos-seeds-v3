import {
  Model,
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { Identifiable } from 'src/common/interfaces';
import { Race } from './race';

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

  @HasMany(() => Race)
  declare races?: Race[];
}
